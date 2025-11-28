```---
slug: design-token
title: design token
authors: [andy]
tags: ["雜記"]
---

```go
# parser

package parser

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"gopkg.in/yaml.v3"
)

// YAMLParser 處理 YAML 檔案解析
type YAMLParser struct {
	data map[string]interface{}
}

// NewYAMLParser 建立新的 YAML 解析器
func NewYAMLParser() *YAMLParser {
	return &YAMLParser{
		data: make(map[string]interface{}),
	}
}

// ParseFile 解析 YAML 檔案
func (p *YAMLParser) ParseFile(filePath string) error {
	content, err := os.ReadFile(filePath)
	if err != nil {
		return fmt.Errorf("讀取檔案失敗: %w", err)
	}

	if err := yaml.Unmarshal(content, &p.data); err != nil {
		return fmt.Errorf("解析 YAML 失敗: %w", err)
	}

	return nil
}

// GetValue 根據路徑獲取值
// 路徑格式: "database.pool.maxConnections" 或 "routes[0].path" 或 "routes[*].middlewares[0]"
// 支援萬用字元 [*] 表示所有陣列項目,當使用 [*] 時會返回多個結果的陣列
func (p *YAMLParser) GetValue(path string) (interface{}, bool) {
	if path == "" {
		return p.data, true
	}

	// 檢查路徑中是否包含萬用字元 [*]
	if strings.Contains(path, "[*]") {
		return p.getValuesWithWildcard(path)
	}

	// 原有的單一路徑邏輯
	parts := strings.Split(path, ".")
	current := interface{}(p.data)

	for _, part := range parts {
		// 檢查是否包含陣列索引 (如: routes[0])
		if strings.Contains(part, "[") {
			fieldName, index, err := parseArrayIndex(part)
			if err != nil {
				return nil, false
			}

			// 先取得陣列
			switch v := current.(type) {
			case map[string]interface{}:
				arr, exists := v[fieldName]
				if !exists {
					return nil, false
				}
				current = arr
			case map[interface{}]interface{}:
				arr, exists := v[fieldName]
				if !exists {
					return nil, false
				}
				current = arr
			default:
				return nil, false
			}

			// 再取得陣列中的元素
			arrValue, ok := current.([]interface{})
			if !ok {
				return nil, false
			}
			if index < 0 || index >= len(arrValue) {
				return nil, false
			}
			current = arrValue[index]
		} else {
			// 一般的欄位存取
			switch v := current.(type) {
			case map[string]interface{}:
				value, exists := v[part]
				if !exists {
					return nil, false
				}
				current = value
			case map[interface{}]interface{}:
				// YAML 有時會將 key 解析為 interface{}
				value, exists := v[part]
				if !exists {
					return nil, false
				}
				current = value
			default:
				return nil, false
			}
		}
	}

	return current, true
}

// getValuesWithWildcard 處理包含萬用字元 [*] 的路徑
// 返回所有匹配的值的陣列
func (p *YAMLParser) getValuesWithWildcard(path string) (interface{}, bool) {
	parts := strings.Split(path, ".")

	// 從根開始,逐步處理每個部分
	var results []interface{}
	results = append(results, p.data)

	for _, part := range parts {
		var newResults []interface{}

		for _, current := range results {
			if strings.Contains(part, "[*]") {
				// 處理萬用字元 [*]
				fieldName := strings.TrimSuffix(part, "[*]")

				// 取得陣列
				var arr []interface{}
				switch v := current.(type) {
				case map[string]interface{}:
					if arrVal, exists := v[fieldName]; exists {
						if a, ok := arrVal.([]interface{}); ok {
							arr = a
						}
					}
				case map[interface{}]interface{}:
					if arrVal, exists := v[fieldName]; exists {
						if a, ok := arrVal.([]interface{}); ok {
							arr = a
						}
					}
				}

				// 將陣列中的所有項目加入結果
				newResults = append(newResults, arr...)

			} else if strings.Contains(part, "[") {
				// 處理特定索引 [0], [1] 等
				fieldName, index, err := parseArrayIndex(part)
				if err != nil {
					continue
				}

				var arr []interface{}
				switch v := current.(type) {
				case map[string]interface{}:
					if arrVal, exists := v[fieldName]; exists {
						if a, ok := arrVal.([]interface{}); ok {
							arr = a
						}
					}
				case map[interface{}]interface{}:
					if arrVal, exists := v[fieldName]; exists {
						if a, ok := arrVal.([]interface{}); ok {
							arr = a
						}
					}
				}

				if index >= 0 && index < len(arr) {
					newResults = append(newResults, arr[index])
				}

			} else {
				// 一般欄位存取
				switch v := current.(type) {
				case map[string]interface{}:
					if value, exists := v[part]; exists {
						newResults = append(newResults, value)
					}
				case map[interface{}]interface{}:
					if value, exists := v[part]; exists {
						newResults = append(newResults, value)
					}
				}
			}
		}

		results = newResults
		if len(results) == 0 {
			return nil, false
		}
	}

	// 如果只有一個結果,直接返回該值
	if len(results) == 1 {
		return results[0], true
	}

	// 多個結果時返回陣列
	return results, true
}

// parseArrayIndex 解析陣列索引，如: "routes[0]" -> ("routes", 0, nil)
func parseArrayIndex(s string) (string, int, error) {
	start := strings.Index(s, "[")
	end := strings.Index(s, "]")

	if start == -1 || end == -1 || start >= end {
		return "", 0, fmt.Errorf("無效的陣列索引格式: %s", s)
	}

	fieldName := s[:start]
	indexStr := s[start+1 : end]

	index, err := strconv.Atoi(indexStr)
	if err != nil {
		return "", 0, fmt.Errorf("無效的索引數字: %s", indexStr)
	}

	return fieldName, index, nil
}

// HasField 檢查路徑是否存在
func (p *YAMLParser) HasField(path string) bool {
	_, exists := p.GetValue(path)
	return exists
}

// GetArray 獲取陣列
func (p *YAMLParser) GetArray(path string) ([]interface{}, bool) {
	value, exists := p.GetValue(path)
	if !exists {
		return nil, false
	}

	arr, ok := value.([]interface{})
	return arr, ok
}

// GetString 獲取字串值
func (p *YAMLParser) GetString(path string) (string, bool) {
	value, exists := p.GetValue(path)
	if !exists {
		return "", false
	}

	str, ok := value.(string)
	return str, ok
}

// GetNumber 獲取數值
func (p *YAMLParser) GetNumber(path string) (float64, bool) {
	value, exists := p.GetValue(path)
	if !exists {
		return 0, false
	}

	switch v := value.(type) {
	case int:
		return float64(v), true
	case float64:
		return v, true
	default:
		return 0, false
	}
}

// GetBool 獲取布林值
func (p *YAMLParser) GetBool(path string) (bool, bool) {
	value, exists := p.GetValue(path)
	if !exists {
		return false, false
	}

	b, ok := value.(bool)
	return b, ok
}

// GetType 獲取值的類型
func (p *YAMLParser) GetType(path string) string {
	value, exists := p.GetValue(path)
	if !exists {
		return "unknown"
	}

	switch value.(type) {
	case string:
		return "string"
	case int, float64:
		return "number"
	case bool:
		return "boolean"
	case []interface{}:
		return "array"
	case map[string]interface{}, map[interface{}]interface{}:
		return "object"
	default:
		return "unknown"
	}
}

// GetMap 獲取 map 物件
func (p *YAMLParser) GetMap(path string) (map[string]interface{}, bool) {
	value, exists := p.GetValue(path)
	if !exists {
		return nil, false
	}

	switch v := value.(type) {
	case map[string]interface{}:
		return v, true
	case map[interface{}]interface{}:
		// 轉換 map[interface{}]interface{} 為 map[string]interface{}
		result := make(map[string]interface{})
		for key, val := range v {
			if strKey, ok := key.(string); ok {
				result[strKey] = val
			}
		}
		return result, true
	default:
		return nil, false
	}
}

// DuplicateInfo 重複欄位資訊
type DuplicateInfo struct {
	Field   string // 重複的欄位名稱
	Value   string // 重複的值
	Indices []int  // 重複出現的陣列索引
}

// PathInfo 路徑資訊，用於追蹤萬用字元展開後的實際路徑
type PathInfo struct {
	Path  string      // 實際路徑 (如: "routes[0].middlewares[1]")
	Value interface{} // 該路徑的值
}

// ExpandWildcardPath 展開包含萬用字元 [*] 的路徑
// 返回所有匹配的實際路徑及其值
func (p *YAMLParser) ExpandWildcardPath(path string) []*PathInfo {
	if !strings.Contains(path, "[*]") {
		// 沒有萬用字元,直接返回
		if value, exists := p.GetValue(path); exists {
			return []*PathInfo{{Path: path, Value: value}}
		}
		return nil
	}

	parts := strings.Split(path, ".")
	var paths []*PathInfo
	paths = append(paths, &PathInfo{Path: "", Value: p.data})

	for partIdx, part := range parts {
		var newPaths []*PathInfo

		for _, pathInfo := range paths {
			currentPath := pathInfo.Path
			current := pathInfo.Value

			if strings.Contains(part, "[*]") {
				// 處理萬用字元 [*]
				fieldName := strings.TrimSuffix(part, "[*]")

				// 取得陣列
				var arr []interface{}
				switch v := current.(type) {
				case map[string]interface{}:
					if arrVal, exists := v[fieldName]; exists {
						if a, ok := arrVal.([]interface{}); ok {
							arr = a
						}
					}
				case map[interface{}]interface{}:
					if arrVal, exists := v[fieldName]; exists {
						if a, ok := arrVal.([]interface{}); ok {
							arr = a
						}
					}
				}

				// 為陣列中的每個項目建立新路徑
				for idx, item := range arr {
					newPath := currentPath
					if newPath != "" {
						newPath += "."
					}
					newPath += fmt.Sprintf("%s[%d]", fieldName, idx)

					// 如果這是最後一個部分,直接加入結果
					// 否則繼續處理後續部分
					if partIdx == len(parts)-1 {
						newPaths = append(newPaths, &PathInfo{Path: newPath, Value: item})
					} else {
						newPaths = append(newPaths, &PathInfo{Path: newPath, Value: item})
					}
				}

			} else if strings.Contains(part, "[") {
				// 處理特定索引
				fieldName, index, err := parseArrayIndex(part)
				if err != nil {
					continue
				}

				var arr []interface{}
				switch v := current.(type) {
				case map[string]interface{}:
					if arrVal, exists := v[fieldName]; exists {
						if a, ok := arrVal.([]interface{}); ok {
							arr = a
						}
					}
				case map[interface{}]interface{}:
					if arrVal, exists := v[fieldName]; exists {
						if a, ok := arrVal.([]interface{}); ok {
							arr = a
						}
					}
				}

				if index >= 0 && index < len(arr) {
					newPath := currentPath
					if newPath != "" {
						newPath += "."
					}
					newPath += fmt.Sprintf("%s[%d]", fieldName, index)
					newPaths = append(newPaths, &PathInfo{Path: newPath, Value: arr[index]})
				}

			} else {
				// 一般欄位存取
				var value interface{}
				var exists bool

				switch v := current.(type) {
				case map[string]interface{}:
					value, exists = v[part]
				case map[interface{}]interface{}:
					value, exists = v[part]
				}

				if exists {
					newPath := currentPath
					if newPath != "" {
						newPath += "."
					}
					newPath += part
					newPaths = append(newPaths, &PathInfo{Path: newPath, Value: value})
				}
			}
		}

		paths = newPaths
		if len(paths) == 0 {
			return nil
		}
	}

	return paths
}

// CheckArrayDuplicates 檢查陣列中某個欄位是否有重複值
// 返回所有重複的欄位資訊
func (p *YAMLParser) CheckArrayDuplicates(arrayPath string, field string) ([]*DuplicateInfo, error) {
	arr, exists := p.GetArray(arrayPath)
	if !exists {
		return nil, fmt.Errorf("陣列路徑不存在: %s", arrayPath)
	}

	// 用於追蹤每個值出現的索引
	valueIndices := make(map[string][]int)

	for i, item := range arr {
		itemMap, ok := item.(map[string]interface{})
		if !ok {
			// 嘗試轉換 map[interface{}]interface{}
			if m, ok2 := item.(map[interface{}]interface{}); ok2 {
				itemMap = make(map[string]interface{})
				for k, v := range m {
					if strKey, ok3 := k.(string); ok3 {
						itemMap[strKey] = v
					}
				}
			} else {
				continue
			}
		}

		// 取得欄位值
		fieldValue, exists := itemMap[field]
		if !exists {
			continue
		}

		// 將值轉為字串以便比較
		strValue := fmt.Sprintf("%v", fieldValue)
		valueIndices[strValue] = append(valueIndices[strValue], i)
	}

	// 找出重複的值
	var duplicates []*DuplicateInfo
	for value, indices := range valueIndices {
		if len(indices) > 1 {
			duplicates = append(duplicates, &DuplicateInfo{
				Field:   field,
				Value:   value,
				Indices: indices,
			})
		}
	}

	return duplicates, nil
}

// CheckArrayMultiFieldDuplicates 檢查陣列中多個欄位組合是否有重複
// fields: 要檢查的欄位列表，例如 ["name", "version"] 會檢查 name+version 的組合是否重複
func (p *YAMLParser) CheckArrayMultiFieldDuplicates(arrayPath string, fields []string) ([]*DuplicateInfo, error) {
	arr, exists := p.GetArray(arrayPath)
	if !exists {
		return nil, fmt.Errorf("陣列路徑不存在: %s", arrayPath)
	}

	// 用於追蹤每個組合值出現的索引
	valueIndices := make(map[string][]int)

	for i, item := range arr {
		itemMap, ok := item.(map[string]interface{})
		if !ok {
			// 嘗試轉換 map[interface{}]interface{}
			if m, ok2 := item.(map[interface{}]interface{}); ok2 {
				itemMap = make(map[string]interface{})
				for k, v := range m {
					if strKey, ok3 := k.(string); ok3 {
						itemMap[strKey] = v
					}
				}
			} else {
				continue
			}
		}

		// 組合所有欄位的值
		var combinedValue strings.Builder
		allFieldsExist := true
		for j, field := range fields {
			fieldValue, exists := itemMap[field]
			if !exists {
				allFieldsExist = false
				break
			}
			if j > 0 {
				combinedValue.WriteString("|")
			}
			combinedValue.WriteString(fmt.Sprintf("%v", fieldValue))
		}

		if !allFieldsExist {
			continue
		}

		key := combinedValue.String()
		valueIndices[key] = append(valueIndices[key], i)
	}

	// 找出重複的值
	var duplicates []*DuplicateInfo
	for value, indices := range valueIndices {
		if len(indices) > 1 {
			duplicates = append(duplicates, &DuplicateInfo{
				Field:   strings.Join(fields, "+"),
				Value:   value,
				Indices: indices,
			})
		}
	}

	return duplicates, nil
}

```

```go
#executor

package rule

import (
	"config-validator/internal/parser"
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"encoding/hex"
	"fmt"
	"hash"
	"regexp"
	"strings"

	"gopkg.in/yaml.v3"
)

// Executor 規則執行引擎
type Executor struct {
	parser *parser.YAMLParser
}

// NewExecutor 建立新的執行引擎
func NewExecutor(p *parser.YAMLParser) *Executor {
	return &Executor{
		parser: p,
	}
}

// Execute 執行規則驗證
func (e *Executor) Execute(rule *ValidationRule, filePath string) []*ValidationResult {
	switch rule.Rule.Type {
	case RuleTypeRequiredField:
		return e.executeRequiredField(rule, filePath)
	case RuleTypeRequiredFields:
		return e.executeRequiredFields(rule, filePath)
	case RuleTypeFieldType:
		return e.executeFieldType(rule, filePath)
	case RuleTypeValueRange:
		return e.executeValueRange(rule, filePath)
	case RuleTypeArrayItemRequiredFields:
		return e.executeArrayItemRequiredFields(rule, filePath)
	case RuleTypeArrayItemField:
		return e.executeArrayItemField(rule, filePath)
	case RuleTypePatternMatch:
		return e.executePatternMatch(rule, filePath)
	case RuleTypeArrayNoDuplicates:
		return e.executeArrayNoDuplicates(rule, filePath)
	case RuleTypeArrayNoDuplicatesCombine:
		return e.executeArrayNoDuplicatesCombine(rule, filePath)
	case RuleTypeNestedArrayNoDuplicates:
		return e.executeNestedArrayNoDuplicates(rule, filePath)
	case RuleTypeNestedArrayItemRequiredFields:
		return e.executeNestedArrayItemRequiredFields(rule, filePath)
	case RuleTypeNestedArrayItemField:
		return e.executeNestedArrayItemField(rule, filePath)
	case RuleTypeHashedValueCheck:
		return e.executeHashedValueCheck(rule, filePath)
	case RuleTypeContainsKeywords:
		return e.executeContainsKeywords(rule, filePath)
	case RuleTypeNoTrailingWhitespace:
		return e.executeNoTrailingWhitespace(rule, filePath)
	default:
		return []*ValidationResult{
			{
				File:     filePath,
				RuleID:   rule.ID,
				RuleName: rule.Name,
				Severity: SeverityError,
				Message:  fmt.Sprintf("不支援的規則類型: %s", rule.Rule.Type),
				Path:     "",
			},
		}
	}
}

// executeRequiredField 執行必要欄位檢查
func (e *Executor) executeRequiredField(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail RequiredFieldRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	if !e.parser.HasField(ruleDetail.Path) {
		return []*ValidationResult{
			{
				File:     filePath,
				RuleID:   rule.ID,
				RuleName: rule.Name,
				Severity: rule.Severity,
				Message:  ruleDetail.Message,
				Path:     ruleDetail.Path,
			},
		}
	}

	return nil
}

// executeRequiredFields 執行多個必要欄位檢查
func (e *Executor) executeRequiredFields(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail RequiredFieldsRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	// 先檢查父路徑是否存在
	if !e.parser.HasField(ruleDetail.Path) {
		return []*ValidationResult{
			{
				File:     filePath,
				RuleID:   rule.ID,
				RuleName: rule.Name,
				Severity: rule.Severity,
				Message:  ruleDetail.Message,
				Path:     ruleDetail.Path,
			},
		}
	}

	// 檢查每個必要欄位
	var results []*ValidationResult
	for _, field := range ruleDetail.Fields {
		fieldPath := ruleDetail.Path + "." + field
		if !e.parser.HasField(fieldPath) {
			results = append(results, &ValidationResult{
				File:     filePath,
				RuleID:   rule.ID,
				RuleName: rule.Name,
				Severity: rule.Severity,
				Message:  ruleDetail.Message,
				Path:     fieldPath,
			})
		}
	}

	return results
}

// executeFieldType 執行欄位類型檢查
func (e *Executor) executeFieldType(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail FieldTypeRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	if !e.parser.HasField(ruleDetail.Path) {
		return nil // 欄位不存在，不檢查類型
	}

	actualType := e.parser.GetType(ruleDetail.Path)
	expectedType := string(ruleDetail.ExpectedType)

	if actualType != expectedType {
		return []*ValidationResult{
			{
				File:     filePath,
				RuleID:   rule.ID,
				RuleName: rule.Name,
				Severity: rule.Severity,
				Message:  ruleDetail.Message,
				Path:     ruleDetail.Path,
			},
		}
	}

	return nil
}

// executeValueRange 執行數值範圍檢查
func (e *Executor) executeValueRange(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail ValueRangeRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	value, exists := e.parser.GetNumber(ruleDetail.Path)
	if !exists {
		return nil // 欄位不存在或不是數字，不檢查範圍
	}

	if value < ruleDetail.Min || value > ruleDetail.Max {
		return []*ValidationResult{
			{
				File:     filePath,
				RuleID:   rule.ID,
				RuleName: rule.Name,
				Severity: rule.Severity,
				Message:  ruleDetail.Message,
				Path:     ruleDetail.Path,
			},
		}
	}

	return nil
}

// executeArrayItemRequiredFields 執行陣列項目必要欄位檢查
// 支援萬用字元路徑 [*]，例如: "routes[*].middlewares"
func (e *Executor) executeArrayItemRequiredFields(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail ArrayItemRequiredFieldsRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	// 檢查路徑是否包含萬用字元
	if strings.Contains(ruleDetail.Path, "[*]") {
		// 展開萬用字元路徑
		paths := e.parser.ExpandWildcardPath(ruleDetail.Path)
		if paths == nil || len(paths) == 0 {
			return nil
		}

		var results []*ValidationResult
		for _, pathInfo := range paths {
			// pathInfo.Value 應該是一個陣列
			arr, ok := pathInfo.Value.([]interface{})
			if !ok {
				continue
			}

			// 檢查陣列中的每個項目
			for i, item := range arr {
				itemMap, ok := item.(map[string]interface{})
				if !ok {
					// 嘗試轉換 map[interface{}]interface{}
					if m, ok2 := item.(map[interface{}]interface{}); ok2 {
						itemMap = make(map[string]interface{})
						for k, v := range m {
							if strKey, ok3 := k.(string); ok3 {
								itemMap[strKey] = v
							}
						}
					} else {
						continue
					}
				}

				// 檢查每個必要欄位
				for _, field := range ruleDetail.RequiredFields {
					if _, exists := itemMap[field]; !exists {
						results = append(results, &ValidationResult{
							File:     filePath,
							RuleID:   rule.ID,
							RuleName: rule.Name,
							Severity: rule.Severity,
							Message:  ruleDetail.Message,
							Path:     fmt.Sprintf("%s[%d].%s", pathInfo.Path, i, field),
						})
					}
				}
			}
		}
		return results
	}

	// 原有的非萬用字元邏輯
	arr, exists := e.parser.GetArray(ruleDetail.Path)
	if !exists {
		return nil // 陣列不存在，不檢查
	}

	var results []*ValidationResult
	for i, item := range arr {
		itemMap, ok := item.(map[string]interface{})
		if !ok {
			// 嘗試轉換 map[interface{}]interface{}
			if m, ok2 := item.(map[interface{}]interface{}); ok2 {
				itemMap = make(map[string]interface{})
				for k, v := range m {
					if strKey, ok3 := k.(string); ok3 {
						itemMap[strKey] = v
					}
				}
			} else {
				continue
			}
		}

		// 檢查每個必要欄位
		for _, field := range ruleDetail.RequiredFields {
			if _, exists := itemMap[field]; !exists {
				results = append(results, &ValidationResult{
					File:     filePath,
					RuleID:   rule.ID,
					RuleName: rule.Name,
					Severity: rule.Severity,
					Message:  ruleDetail.Message,
					Path:     fmt.Sprintf("%s[%d].%s", ruleDetail.Path, i, field),
				})
			}
		}
	}

	return results
}

// executeArrayItemField 執行陣列項目欄位驗證
func (e *Executor) executeArrayItemField(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail ArrayItemFieldRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	arr, exists := e.parser.GetArray(ruleDetail.Path)
	if !exists {
		return nil // 陣列不存在，不檢查
	}

	var results []*ValidationResult
	for i, item := range arr {
		itemMap, ok := item.(map[string]interface{})
		if !ok {
			// 嘗試轉換 map[interface{}]interface{}
			if m, ok2 := item.(map[interface{}]interface{}); ok2 {
				itemMap = make(map[string]interface{})
				for k, v := range m {
					if strKey, ok3 := k.(string); ok3 {
						itemMap[strKey] = v
					}
				}
			} else {
				continue
			}
		}

		fieldValue, exists := itemMap[ruleDetail.Field]
		if !exists {
			continue
		}

		// 目前只支援 enum 驗證
		if ruleDetail.Validation.Type == "enum" {
			fieldStr, ok := fieldValue.(string)
			if !ok {
				continue
			}

			valid := false
			for _, allowed := range ruleDetail.Validation.AllowedValues {
				if fieldStr == allowed {
					valid = true
					break
				}
			}

			if !valid {
				results = append(results, &ValidationResult{
					File:     filePath,
					RuleID:   rule.ID,
					RuleName: rule.Name,
					Severity: rule.Severity,
					Message:  ruleDetail.Message,
					Path:     fmt.Sprintf("%s[%d].%s", ruleDetail.Path, i, ruleDetail.Field),
				})
			}
		}
	}

	return results
}

// executePatternMatch 執行正則表達式驗證
func (e *Executor) executePatternMatch(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail PatternMatchRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	value, exists := e.parser.GetString(ruleDetail.Path)
	if !exists {
		return nil // 欄位不存在或不是字串，不檢查
	}

	matched, err := regexp.MatchString(ruleDetail.Pattern, value)
	if err != nil {
		return makeErrorResult(rule, filePath, ruleDetail.Path, fmt.Sprintf("正則表達式錯誤: %v", err))
	}

	if !matched {
		return []*ValidationResult{
			{
				File:     filePath,
				RuleID:   rule.ID,
				RuleName: rule.Name,
				Severity: rule.Severity,
				Message:  ruleDetail.Message,
				Path:     ruleDetail.Path,
			},
		}
	}

	return nil
}

// unmarshalRule 將 RawRule 解析為具體的規則結構
func unmarshalRule(rawRule map[string]interface{}, target interface{}) error {
	// 將 map 轉換為 YAML，再解析回結構
	data, err := yaml.Marshal(rawRule)
	if err != nil {
		return fmt.Errorf("序列化規則失敗: %w", err)
	}

	if err := yaml.Unmarshal(data, target); err != nil {
		return fmt.Errorf("解析規則失敗: %w", err)
	}

	return nil
}

// executeArrayNoDuplicates 執行陣列欄位不可重複檢查
func (e *Executor) executeArrayNoDuplicates(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail ArrayNoDuplicatesRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	duplicates, err := e.parser.CheckArrayDuplicates(ruleDetail.Path, ruleDetail.Field)
	if err != nil {
		// 如果陣列不存在,不回報錯誤
		return nil
	}

	var results []*ValidationResult
	for _, dup := range duplicates {
		// 為每個重複的索引建立一個錯誤
		for _, idx := range dup.Indices {
			results = append(results, &ValidationResult{
				File:     filePath,
				RuleID:   rule.ID,
				RuleName: rule.Name,
				Severity: rule.Severity,
				Message:  fmt.Sprintf("%s (重複值: %s)", ruleDetail.Message, dup.Value),
				Path:     fmt.Sprintf("%s[%d].%s", ruleDetail.Path, idx, ruleDetail.Field),
			})
		}
	}

	return results
}

// executeArrayNoDuplicatesCombine 執行陣列多欄位組合不可重複檢查
func (e *Executor) executeArrayNoDuplicatesCombine(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail ArrayNoDuplicatesCombineRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	duplicates, err := e.parser.CheckArrayMultiFieldDuplicates(ruleDetail.Path, ruleDetail.Fields)
	if err != nil {
		// 如果陣列不存在,不回報錯誤
		return nil
	}

	var results []*ValidationResult
	for _, dup := range duplicates {
		// 為每個重複的索引建立一個錯誤
		for _, idx := range dup.Indices {
			results = append(results, &ValidationResult{
				File:     filePath,
				RuleID:   rule.ID,
				RuleName: rule.Name,
				Severity: rule.Severity,
				Message:  fmt.Sprintf("%s (重複組合: %s)", ruleDetail.Message, dup.Value),
				Path:     fmt.Sprintf("%s[%d]", ruleDetail.Path, idx),
			})
		}
	}

	return results
}

// executeNestedArrayNoDuplicates 執行巢狀陣列欄位不可重複檢查
// 檢查父陣列中每個項目的子陣列是否有重複
func (e *Executor) executeNestedArrayNoDuplicates(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail NestedArrayNoDuplicatesRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	// 取得父陣列
	parentArr, exists := e.parser.GetArray(ruleDetail.ParentPath)
	if !exists {
		return nil // 父陣列不存在,不檢查
	}

	var results []*ValidationResult

	// 遍歷父陣列的每個項目
	for parentIdx := range parentArr {
		// 構建子陣列的完整路徑，如 "apiconfig.routes[0].middlewares"
		childArrayPath := fmt.Sprintf("%s[%d].%s", ruleDetail.ParentPath, parentIdx, ruleDetail.ChildPath)

		var duplicates []*parser.DuplicateInfo
		var err error

		// 根據是單一欄位還是多欄位組合來檢查重複
		if ruleDetail.Field != "" {
			// 單一欄位檢查
			duplicates, err = e.parser.CheckArrayDuplicates(childArrayPath, ruleDetail.Field)
		} else if len(ruleDetail.Fields) > 0 {
			// 多欄位組合檢查
			duplicates, err = e.parser.CheckArrayMultiFieldDuplicates(childArrayPath, ruleDetail.Fields)
		} else {
			return makeErrorResult(rule, filePath, "", "必須指定 field 或 fields")
		}

		if err != nil {
			// 子陣列不存在或其他錯誤,繼續檢查下一個
			continue
		}

		// 將找到的重複項目加入結果
		for _, dup := range duplicates {
			for _, childIdx := range dup.Indices {
				var path string
				if ruleDetail.Field != "" {
					path = fmt.Sprintf("%s[%d].%s[%d].%s", ruleDetail.ParentPath, parentIdx, ruleDetail.ChildPath, childIdx, ruleDetail.Field)
				} else {
					path = fmt.Sprintf("%s[%d].%s[%d]", ruleDetail.ParentPath, parentIdx, ruleDetail.ChildPath, childIdx)
				}

				results = append(results, &ValidationResult{
					File:     filePath,
					RuleID:   rule.ID,
					RuleName: rule.Name,
					Severity: rule.Severity,
					Message:  fmt.Sprintf("%s (重複值: %s)", ruleDetail.Message, dup.Value),
					Path:     path,
				})
			}
		}
	}

	return results
}

// executeNestedArrayItemRequiredFields 執行巢狀陣列項目必要欄位檢查
// 檢查父陣列中每個項目的子陣列項目是否有必要欄位
func (e *Executor) executeNestedArrayItemRequiredFields(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail NestedArrayItemRequiredFieldsRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	// 取得父陣列
	parentArr, exists := e.parser.GetArray(ruleDetail.ParentPath)
	if !exists {
		return nil // 父陣列不存在,不檢查
	}

	var results []*ValidationResult

	// 遍歷父陣列的每個項目
	for parentIdx := range parentArr {
		// 構建子陣列的完整路徑
		childArrayPath := fmt.Sprintf("%s[%d].%s", ruleDetail.ParentPath, parentIdx, ruleDetail.ChildPath)

		// 取得子陣列
		childArr, exists := e.parser.GetArray(childArrayPath)
		if !exists {
			continue // 子陣列不存在,繼續檢查下一個
		}

		// 檢查子陣列的每個項目
		for childIdx, item := range childArr {
			itemMap, ok := item.(map[string]interface{})
			if !ok {
				// 嘗試轉換 map[interface{}]interface{}
				if m, ok2 := item.(map[interface{}]interface{}); ok2 {
					itemMap = make(map[string]interface{})
					for k, v := range m {
						if strKey, ok3 := k.(string); ok3 {
							itemMap[strKey] = v
						}
					}
				} else {
					continue
				}
			}

			// 檢查每個必要欄位
			for _, field := range ruleDetail.RequiredFields {
				if _, exists := itemMap[field]; !exists {
					results = append(results, &ValidationResult{
						File:     filePath,
						RuleID:   rule.ID,
						RuleName: rule.Name,
						Severity: rule.Severity,
						Message:  ruleDetail.Message,
						Path:     fmt.Sprintf("%s[%d].%s[%d].%s", ruleDetail.ParentPath, parentIdx, ruleDetail.ChildPath, childIdx, field),
					})
				}
			}
		}
	}

	return results
}

// executeNestedArrayItemField 執行巢狀陣列項目欄位驗證
// 驗證父陣列中每個項目的子陣列項目的欄位值
func (e *Executor) executeNestedArrayItemField(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail NestedArrayItemFieldRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	// 取得父陣列
	parentArr, exists := e.parser.GetArray(ruleDetail.ParentPath)
	if !exists {
		return nil // 父陣列不存在,不檢查
	}

	var results []*ValidationResult

	// 遍歷父陣列的每個項目
	for parentIdx := range parentArr {
		// 構建子陣列的完整路徑
		childArrayPath := fmt.Sprintf("%s[%d].%s", ruleDetail.ParentPath, parentIdx, ruleDetail.ChildPath)

		// 取得子陣列
		childArr, exists := e.parser.GetArray(childArrayPath)
		if !exists {
			continue // 子陣列不存在,繼續檢查下一個
		}

		// 檢查子陣列的每個項目
		for childIdx, item := range childArr {
			itemMap, ok := item.(map[string]interface{})
			if !ok {
				// 嘗試轉換 map[interface{}]interface{}
				if m, ok2 := item.(map[interface{}]interface{}); ok2 {
					itemMap = make(map[string]interface{})
					for k, v := range m {
						if strKey, ok3 := k.(string); ok3 {
							itemMap[strKey] = v
						}
					}
				} else {
					continue
				}
			}

			fieldValue, exists := itemMap[ruleDetail.Field]
			if !exists {
				continue
			}

			// 目前只支援 enum 驗證
			if ruleDetail.Validation.Type == "enum" {
				fieldStr, ok := fieldValue.(string)
				if !ok {
					continue
				}

				valid := false
				for _, allowed := range ruleDetail.Validation.AllowedValues {
					if fieldStr == allowed {
						valid = true
						break
					}
				}

				if !valid {
					results = append(results, &ValidationResult{
						File:     filePath,
						RuleID:   rule.ID,
						RuleName: rule.Name,
						Severity: rule.Severity,
						Message:  ruleDetail.Message,
						Path:     fmt.Sprintf("%s[%d].%s[%d].%s", ruleDetail.ParentPath, parentIdx, ruleDetail.ChildPath, childIdx, ruleDetail.Field),
					})
				}
			}
		}
	}

	return results
}

// makeErrorResult 建立錯誤結果
func makeErrorResult(rule *ValidationRule, filePath, path, message string) []*ValidationResult {
	return []*ValidationResult{
		{
			File:     filePath,
			RuleID:   rule.ID,
			RuleName: rule.Name,
			Severity: SeverityError,
			Message:  message,
			Path:     path,
		},
	}
}

// executeHashedValueCheck 執行雜湊值檢查
func (e *Executor) executeHashedValueCheck(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail HashedValueCheckRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	value, exists := e.parser.GetString(ruleDetail.Path)
	if !exists {
		return nil // 欄位不存在，不檢查
	}

	// 計算雜湊值
	var hasher hash.Hash
	switch strings.ToLower(ruleDetail.HashAlgorithm) {
	case "sha256":
		hasher = sha256.New()
	case "sha1":
		hasher = sha1.New()
	case "sha512":
		hasher = sha512.New()
	case "md5":
		hasher = md5.New()
	default:
		return makeErrorResult(rule, filePath, ruleDetail.Path, fmt.Sprintf("不支援的雜湊演算法: %s", ruleDetail.HashAlgorithm))
	}

	hasher.Write([]byte(value))
	hashValue := hex.EncodeToString(hasher.Sum(nil))

	// 檢查是否在列表中
	inList := false
	for _, h := range ruleDetail.HashList {
		if strings.EqualFold(hashValue, h) {
			inList = true
			break
		}
	}

	// 根據模式判斷是否違規
	violation := false
	if ruleDetail.Mode == "forbidden" && inList {
		violation = true // 禁止模式且在列表中
	} else if ruleDetail.Mode == "allowed" && !inList {
		violation = true // 允許模式但不在列表中
	}

	if violation {
		return []*ValidationResult{{
			File:     filePath,
			RuleID:   rule.ID,
			RuleName: rule.Name,
			Severity: rule.Severity,
			Message:  ruleDetail.Message,
			Path:     ruleDetail.Path,
		}}
	}

	return nil
}

// executeContainsKeywords 執行關鍵字檢查
func (e *Executor) executeContainsKeywords(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail ContainsKeywordsRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	// 檢查路徑是否包含萬用字元
	if strings.Contains(ruleDetail.Path, "[*]") {
		// 展開萬用字元路徑
		paths := e.parser.ExpandWildcardPath(ruleDetail.Path)
		if paths == nil || len(paths) == 0 {
			return nil
		}

		var results []*ValidationResult
		for _, pathInfo := range paths {
			value, ok := pathInfo.Value.(string)
			if !ok {
				continue
			}

			// 檢查此值
			if violation, matchedKeyword := e.checkKeywords(value, ruleDetail); violation {
				message := ruleDetail.Message
				if matchedKeyword != "" {
					message = fmt.Sprintf("%s (包含關鍵字: %s)", ruleDetail.Message, matchedKeyword)
				}

				results = append(results, &ValidationResult{
					File:     filePath,
					RuleID:   rule.ID,
					RuleName: rule.Name,
					Severity: rule.Severity,
					Message:  message,
					Path:     pathInfo.Path,
				})
			}
		}
		return results
	}

	// 原有的非萬用字元邏輯
	value, exists := e.parser.GetString(ruleDetail.Path)
	if !exists {
		return nil // 欄位不存在，不檢查
	}

	if violation, matchedKeyword := e.checkKeywords(value, ruleDetail); violation {
		message := ruleDetail.Message
		if matchedKeyword != "" {
			message = fmt.Sprintf("%s (包含關鍵字: %s)", ruleDetail.Message, matchedKeyword)
		}

		return []*ValidationResult{{
			File:     filePath,
			RuleID:   rule.ID,
			RuleName: rule.Name,
			Severity: rule.Severity,
			Message:  message,
			Path:     ruleDetail.Path,
		}}
	}

	return nil
}

// checkKeywords 檢查字串是否包含關鍵字
func (e *Executor) checkKeywords(value string, ruleDetail ContainsKeywordsRule) (bool, string) {
	// 處理大小寫
	checkValue := value
	keywords := make([]string, len(ruleDetail.Keywords))
	copy(keywords, ruleDetail.Keywords)

	if !ruleDetail.CaseSensitive {
		checkValue = strings.ToLower(value)
		for i := range keywords {
			keywords[i] = strings.ToLower(keywords[i])
		}
	}

	// 檢查是否包含關鍵字
	containsAny := false
	matchedKeyword := ""
	for _, keyword := range keywords {
		if strings.Contains(checkValue, keyword) {
			containsAny = true
			matchedKeyword = keyword
			break
		}
	}

	// 根據模式判斷是否違規
	violation := false
	if ruleDetail.Mode == "forbidden" && containsAny {
		violation = true // 禁止模式且包含關鍵字
	} else if ruleDetail.Mode == "required" && !containsAny {
		violation = true // 必須模式但不包含關鍵字
	}

	return violation, matchedKeyword
}

// executeNoTrailingWhitespace 執行 trailing whitespace 檢查
// 自動掃描整個 YAML 檔案中所有字串欄位
func (e *Executor) executeNoTrailingWhitespace(rule *ValidationRule, filePath string) []*ValidationResult {
	var ruleDetail NoTrailingWhitespaceRule
	if err := unmarshalRule(rule.Rule.RawRule, &ruleDetail); err != nil {
		return makeErrorResult(rule, filePath, "", err.Error())
	}

	// 獲取整個 YAML 文件的資料
	rootData, exists := e.parser.GetValue("")
	if !exists {
		return nil
	}

	var results []*ValidationResult

	// 遞迴檢查所有字串欄位
	e.scanForTrailingWhitespace(rootData, "", &results, rule, filePath, ruleDetail.Message)

	return results
}

// scanForTrailingWhitespace 遞迴掃描資料結構，檢查所有字串值
func (e *Executor) scanForTrailingWhitespace(data interface{}, currentPath string, results *[]*ValidationResult, rule *ValidationRule, filePath, message string) {
	switch v := data.(type) {
	case map[string]interface{}:
		// 遍歷物件的每個欄位
		for key, value := range v {
			newPath := key
			if currentPath != "" {
				newPath = currentPath + "." + key
			}
			e.scanForTrailingWhitespace(value, newPath, results, rule, filePath, message)
		}

	case map[interface{}]interface{}:
		// 處理 YAML 特殊的 map[interface{}]interface{} 格式
		for key, value := range v {
			keyStr, ok := key.(string)
			if !ok {
				continue
			}
			newPath := keyStr
			if currentPath != "" {
				newPath = currentPath + "." + keyStr
			}
			e.scanForTrailingWhitespace(value, newPath, results, rule, filePath, message)
		}

	case []interface{}:
		// 遍歷陣列的每個項目
		for i, item := range v {
			newPath := fmt.Sprintf("%s[%d]", currentPath, i)
			e.scanForTrailingWhitespace(item, newPath, results, rule, filePath, message)
		}

	case string:
		// 檢查字串值
		if wsType := e.checkTrailingWhitespace(v); wsType != "" {
			*results = append(*results, &ValidationResult{
				File:     filePath,
				RuleID:   rule.ID,
				RuleName: rule.Name,
				Severity: rule.Severity,
				Message:  fmt.Sprintf("%s (%s有空白字元)", message, wsType),
				Path:     currentPath,
			})
		}

	// 其他類型（數字、布林值等）不需要檢查
	}
}

// checkTrailingWhitespace 檢查字串是否有 trailing/leading whitespace
func (e *Executor) checkTrailingWhitespace(value string) string {
	trimmed := strings.TrimSpace(value)
	if value == trimmed {
		return "" // 沒有空白字元
	}

	// 判斷是 leading 還是 trailing
	var wsType string
	if strings.HasPrefix(value, " ") || strings.HasPrefix(value, "\t") {
		wsType = "開頭"
	}
	if strings.HasSuffix(value, " ") || strings.HasSuffix(value, "\t") {
		if wsType != "" {
			wsType = "開頭和結尾"
		} else {
			wsType = "結尾"
		}
	}

	return wsType
}


```


```go
# types rule
package rule

// Severity 定義規則的嚴重程度
type Severity string

const (
	SeverityError   Severity = "error"
	SeverityWarning Severity = "warning"
	SeverityInfo    Severity = "info"
)

// RuleType 定義規則類型
type RuleType string

const (
	RuleTypeRequiredField                 RuleType = "required_field"
	RuleTypeRequiredFields                RuleType = "required_fields"
	RuleTypeFieldType                     RuleType = "field_type"
	RuleTypeValueRange                    RuleType = "value_range"
	RuleTypeArrayItemRequiredFields       RuleType = "array_item_required_fields"
	RuleTypeArrayItemField                RuleType = "array_item_field"
	RuleTypePatternMatch                  RuleType = "pattern_match"
	RuleTypeArrayNoDuplicates             RuleType = "array_no_duplicates"
	RuleTypeArrayNoDuplicatesCombine      RuleType = "array_no_duplicates_combine"
	RuleTypeNestedArrayNoDuplicates       RuleType = "nested_array_no_duplicates"
	RuleTypeNestedArrayItemRequiredFields RuleType = "nested_array_item_required_fields"
	RuleTypeNestedArrayItemField          RuleType = "nested_array_item_field"
	RuleTypeHashedValueCheck              RuleType = "hashed_value_check"
	RuleTypeContainsKeywords              RuleType = "contains_keywords"
	RuleTypeNoTrailingWhitespace          RuleType = "no_trailing_whitespace"
)

// FieldType 定義欄位類型
type FieldType string

const (
	FieldTypeString  FieldType = "string"
	FieldTypeNumber  FieldType = "number"
	FieldTypeBoolean FieldType = "boolean"
	FieldTypeArray   FieldType = "array"
	FieldTypeObject  FieldType = "object"
)

// ValidationRule 定義驗證規則
type ValidationRule struct {
	ID          string   `yaml:"id"`
	Name        string   `yaml:"name"`
	Enabled     bool     `yaml:"enabled"`
	Severity    Severity `yaml:"severity"`
	Description string   `yaml:"description,omitempty"`
	Targets     Targets  `yaml:"targets"`
	Rule        Rule     `yaml:"rule"`
}

// Targets 定義規則適用的目標檔案
type Targets struct {
	FilePatterns []string `yaml:"file_patterns"`
}

// Rule 定義具體的驗證邏輯
type Rule struct {
	Type     RuleType               `yaml:"type"`
	RawRule  map[string]interface{} `yaml:",inline"`
}

// RequiredFieldRule 必要欄位規則
type RequiredFieldRule struct {
	Path    string `yaml:"path"`
	Message string `yaml:"message"`
}

// RequiredFieldsRule 多個必要欄位規則
type RequiredFieldsRule struct {
	Path    string   `yaml:"path"`
	Fields  []string `yaml:"fields"`
	Message string   `yaml:"message"`
}

// FieldTypeRule 欄位類型規則
type FieldTypeRule struct {
	Path         string    `yaml:"path"`
	ExpectedType FieldType `yaml:"expected_type"`
	Message      string    `yaml:"message"`
}

// ValueRangeRule 數值範圍規則
type ValueRangeRule struct {
	Path    string  `yaml:"path"`
	Min     float64 `yaml:"min"`
	Max     float64 `yaml:"max"`
	Message string  `yaml:"message"`
}

// ArrayItemRequiredFieldsRule 陣列項目必要欄位規則
type ArrayItemRequiredFieldsRule struct {
	Path           string   `yaml:"path"`
	RequiredFields []string `yaml:"required_fields"`
	Message        string   `yaml:"message"`
}

// ArrayItemFieldRule 陣列項目欄位規則
type ArrayItemFieldRule struct {
	Path       string     `yaml:"path"`
	Field      string     `yaml:"field"`
	Validation Validation `yaml:"validation"`
	Message    string     `yaml:"message"`
}

// Validation 定義驗證類型
type Validation struct {
	Type          string   `yaml:"type"`
	AllowedValues []string `yaml:"allowed_values,omitempty"`
}

// PatternMatchRule 正則表達式規則
type PatternMatchRule struct {
	Path    string `yaml:"path"`
	Pattern string `yaml:"pattern"`
	Message string `yaml:"message"`
}

// ArrayNoDuplicatesRule 陣列欄位不可重複規則
type ArrayNoDuplicatesRule struct {
	Path    string `yaml:"path"`
	Field   string `yaml:"field"`
	Message string `yaml:"message"`
}

// ArrayNoDuplicatesCombineRule 陣列多欄位組合不可重複規則
type ArrayNoDuplicatesCombineRule struct {
	Path    string   `yaml:"path"`
	Fields  []string `yaml:"fields"`
	Message string   `yaml:"message"`
}

// NestedArrayNoDuplicatesRule 巢狀陣列欄位不可重複規則
// 用於檢查父陣列中每個項目的子陣列是否有重複
// 例如: 檢查 routes[*].middlewares 中的 name 是否重複
type NestedArrayNoDuplicatesRule struct {
	ParentPath string   `yaml:"parent_path"` // 父陣列路徑，如 "apiconfig.routes"
	ChildPath  string   `yaml:"child_path"`  // 子陣列欄位名稱，如 "middlewares"
	Field      string   `yaml:"field"`       // 要檢查的欄位，如 "name"
	Fields     []string `yaml:"fields"`      // 或多個欄位組合
	Message    string   `yaml:"message"`
}

// NestedArrayItemRequiredFieldsRule 巢狀陣列項目必要欄位規則
// 用於檢查父陣列中每個項目的子陣列項目是否有必要欄位
// 例如: 檢查所有 routes[*].middlewares[*] 是否都有 name 和 priority 欄位
type NestedArrayItemRequiredFieldsRule struct {
	ParentPath     string   `yaml:"parent_path"`     // 父陣列路徑，如 "apiconfig.routes"
	ChildPath      string   `yaml:"child_path"`      // 子陣列欄位名稱，如 "middlewares"
	RequiredFields []string `yaml:"required_fields"` // 必要欄位列表
	Message        string   `yaml:"message"`
}

// NestedArrayItemFieldRule 巢狀陣列項目欄位驗證規則
// 用於驗證父陣列中每個項目的子陣列項目的欄位值
// 例如: 檢查所有 routes[*].middlewares[*].priority 是否在合理範圍內
type NestedArrayItemFieldRule struct {
	ParentPath string     `yaml:"parent_path"` // 父陣列路徑，如 "apiconfig.routes"
	ChildPath  string     `yaml:"child_path"`  // 子陣列欄位名稱，如 "middlewares"
	Field      string     `yaml:"field"`       // 要驗證的欄位，如 "priority"
	Validation Validation `yaml:"validation"`  // 驗證規則
	Message    string     `yaml:"message"`
}

// HashedValueCheckRule SHA 雜湊值檢查規則
type HashedValueCheckRule struct {
	Path          string   `yaml:"path"`
	HashAlgorithm string   `yaml:"hash_algorithm"` // sha1, sha256, sha512, md5
	Mode          string   `yaml:"mode"`           // forbidden, allowed
	HashList      []string `yaml:"hash_list"`      // 雜湊值列表
	Message       string   `yaml:"message"`
}

// ContainsKeywordsRule 關鍵字檢查規則
type ContainsKeywordsRule struct {
	Path          string   `yaml:"path"`
	Mode          string   `yaml:"mode"`           // forbidden, required
	CaseSensitive bool     `yaml:"case_sensitive"` // 是否區分大小寫
	Keywords      []string `yaml:"keywords"`       // 關鍵字列表
	Message       string   `yaml:"message"`
}

// NoTrailingWhitespaceRule Trailing whitespace 檢查規則
// 自動掃描整個 YAML 檔案中所有字串欄位，檢查是否有 trailing/leading 空白
type NoTrailingWhitespaceRule struct {
	Message string `yaml:"message"`
}

// ValidationResult 驗證結果
type ValidationResult struct {
	File     string   `json:"file"`
	RuleID   string   `json:"rule_id"`
	RuleName string   `json:"rule_name"`
	Severity Severity `json:"severity"`
	Message  string   `json:"message"`
	Path     string   `json:"path"`
}

```