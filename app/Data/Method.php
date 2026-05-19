<?php

namespace App\Data;

use Illuminate\Support\Collection;

class Method
{

    public static function all(): Collection {
        return collect([
            [
                'name' => 'Append',
                'description' => 'Appends the given values to the end of the collection.',
                'params' => [
                    'c' => 'A slice of any type',
                    'values' => 'One or more values to append',
                ],
                'return' => [
                    'A pointer to the modified collection',
                    'An error or nil'
                ],
                'code' => <<<'EOD'
gollection.Append([]int{1, 2, 3}, 4, 5, 6)
// [1, 2, 3, 4, 5, 6]
EOD
            ],
            [
                'name' => 'At',
                'description' => 'Returns the value at the given index.',
                'params' => [
                    'c' => 'A slice of any type',
                    'index' => 'A positive integer',
                ],
                'return' => [
                    'A pointer to the index th element in the collection',
                    'An error or nil'
                ],
                'code' => <<<'EOD'
gollection.At([]int{1, 2, 3}, 1)
// 2, nil
EOD
            ],
            [
                'name' => 'Average',
                'description' => 'Returns the average of the collection. Elements must be numeric.',
                'params' => [
                    'c' => 'A slice of numeric values',
                ],
                'return' => [
                    'A float64 value representing the average of the collection',
                ],
                'code' => <<<'EOD'
gollection.Average([]int{1, 2, 3})
// 2
EOD
            ],
            [
                'name' => 'Avg',
                'description' => 'Alias of Average',
                'code' => null,
            ],
            [
                'name' => 'Chunk',
                'description' => 'Splits the collection into chunks of the given size.',
                'params' => [
                    'c' => 'A slice of any type',
                    'size' => 'A positive integer',
                ],
                'return' => [
                    'A new slice containing slices of the given size containing the elements of the original collection',
                    'An error or nil'
                ],
                'code' => <<<'EOD'
gollection.Chunk([]int{1, 2, 3, 4, 5, 6}, 3)
// [[1, 2, 3], [4, 5, 6]]
EOD
            ],
            [
                'name' => 'ChunkBy',
                'description' => 'Splits the collection into chunks of the given size, grouped by the given function that returns a boolean value.'.
                'The function should return false if the current item belongs to the last chunk or true if it belongs to the next new chunk.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each parameter from c and returns a boolean value',
                ],
                'return' => [
                    'A new slice containing slices containing the elements of the original collection grouped by the given function',
                    'An error or nil'
                ],
                'code' => <<<'EOD'
gollection.ChunkBy([]int{1, 2, 3, 4, 5, 6}, func(n int) bool { return n%2 == 1 })
// [[1, 2], [3, 4], [5, 6]]
EOD
            ],
            [
                'name' => 'Collapse',
                'description' => 'Flattens a collection of slices into a single, flat slice.',
                'params' => [
                    'c' => 'A slice of slices of any given type',
                ],
                'return' => [
                    'A new slice containing all the elements of the original collection in a single flat slice',
                ],
                'code' => <<<'EOD'
gollection.Collapse([][]int{{1, 2}, {3, 4}, {5, 6}})
// [1, 2, 3, 4, 5, 6]
EOD
            ],
            [
                'name' => 'CollapseMap',
                'description' => 'Collapses a slices of maps into a single map.',
                'params' => [
                    'c' => 'A slice of maps of any given type',
                ],
                'return' => [
                    'A new map containing all the elements of the original map in a single flat map. Values are overwritten if they have the same key.',
                ],
                'code' => <<<'EOD'
gollection.CollapseMap([]map[string]int{{"a": 1, "c": 4}, {"b": 2, "a": 3}})
// {"a": 3, "b": 2, "c": 4}
EOD
            ],
            [
                'name' => 'Combine',
                'description' => 'Combines two slices into a map. The first slice is used as the keys and the second slice is used as the values.',
                'params' => [
                    'c' => 'A slice of any comparable type representing the keys',
                    'other' => 'A slice of any type representing the values',
                ],
                'return' => [
                    'A new map containing the keys from c and values of other',
                ],
                'code' => <<<'EOD'
gollection.Combine([]string{"a", "b"}, []int{1, 2})
// {"a": 1, "b": 2}
EOD
            ],
            [
                'name' => 'CombineMap',
                'description' => 'Combines two maps into a single map. Duplicate keys are overwritten by the values of the second map.',
                'params' => [
                    'c' => 'A map of any type',
                    'other' => 'Another map of similar type',
                ],
                'return' => [
                    'A new map all the keys from c values from other.',
                ],
                'code' => <<<'EOD'
gollection.CombineMap(map[string]int{"a": 1}, map[string]int{"b": 2, "a": 3})
// {"a": 3, "b": 2}
EOD
            ],
            [
                'name' => 'CombineSlice',
                'description' => 'Alias of Combine',
                'code' => null,
            ],
            [
                'name' => 'Contains',
                'description' => 'Whether a slice contains a given item.',
                'params' => [
                    'c' => 'A slice of any type',
                    'item' => 'The value to check for in the collection',
                ],
                'return' => [
                    'A boolean representing whether the slice contains the given item',
                ],
                'code' => <<<'EOD'
gollection.Contains([]int{1, 2, 3, 4}, 4)
// true
EOD
            ],
            [
                'name' => 'ContainsKey',
                'description' => 'Whether a map contains a given key.',
                'params' => [
                    'c' => 'A map of any type',
                    'key' => 'The key to check for in the collection',
                ],
                'return' => [
                    'A boolean representing whether c has the given key',
                ],
                'code' => <<<'EOD'
gollection.ContainsKey(map[string]int{"k": 1}, "k")
// true
EOD
            ],
            [
                'name' => 'Count',
                'description' => 'same as len',
                'code' => null
            ],
            [
                'name' => 'CountBy',
                'description' => 'A count of the number of items in the collection that satisfy the given function.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each parameter from c and returns a boolean value',
                ],
                'return' => [
                    'An integer',
                ],
                'code' => <<<'EOD'
gollection.CountBy([]int{1, 2, 3, 4}, func(x int) bool { return x%2 == 0 })
// 2
EOD
            ],
            [
                'name' => 'Counts',
                'description' => 'Returns a map with keys from c and integer values representing the number of times each key appears in the collection.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                ],
                'return' => [
                    'A map with keys from c and integer values.',
                ],
                'code' => <<<'EOD'
gollection.Counts([]string{"a", "a", "b"})
// {"a": 2, "b": 1}
EOD
            ],
            [
                'name' => 'CrossJoin',
                'description' => 'Returns a slice of slices containing all the combinations of pairs of elements from c and other.',
                'params' => [
                    'c' => 'A slice of any type',
                    'other' => 'A slice of any type',
                ],
                'return' => [
                    'A slice of slices containing all possible pairs of elements one from each of c and other.',
                ],
                'code' => <<<'EOD'
gollection.CrossJoin([]int{1, 2, 3}, []string{"x", "y"})
// [[1, "x"], [1, "y"], [2, "x"], [2, "y"], [3, "x"], [3, "y"]]
EOD
            ],
            [
                'name' => 'Diff',
                'description' => 'Remove all instances of elements from the second slice from the first slice.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                    'other' => 'Another slice of the same type',
                ],
                'return' => [
                    'A new slice containing the elements of c that are not in other.',
                ],
                'code' => <<<'EOD'
gollection.Diff([]int{1, 2, 3}, []int{2})
// [1,3]
EOD
            ],
            [
                'name' => 'DiffAssoc',
                'description' => 'DiffAssoc returns the the keys and values of the first map that have a matching key in the second map, but a different value.',
                'params' => [
                    'c' => 'A map of any type',
                    'other' => 'Another map of the same type',
                ],
                'return' => [
                    'A map of the same type',
                ],
                'code' => <<<'EOD'
gollection.DiffAssoc(map[string]int{"a": 1, "b": 3}, map[string]int{"a": 1, "b": 2})
// {"b": 3}
EOD
            ],
            [
                'name' => 'DiffKeys',
                'description' => 'Returns a slice of keys that are present in the first map but not in the second.',
                'params' => [
                    'c' => 'A map of any type',
                    'other' => 'Another map of the same type',
                ],
                'return' => [
                    'A slice of keys that are present in the first map but not in the second.',
                ],
                'code' => <<<'EOD'
gollection.DiffKeys(map[string]int{"a": 1, "b": 2, "d": 4}, map[string]int{"b": 3, "d": 4})
// ["a"]
EOD
            ],
            [
                'name' => 'DoesntContain',
                'description' => 'Whether a slice does NOT contain a given value. Opposite of Contains.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                    'other' => 'A comparable value',
                ],
                'return' => [
                    'A boolean value',
                ],
                'code' => <<<'EOD'
gollection.DoesntContain([]int{1, 3, 4, 5}, 2)
// true
EOD
            ],
            [
                'name' => 'Duplicates',
                'description' => 'Returns a slice of the duplicate values from the collection.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                ],
                'return' => [
                    'A slice of values that appear more than once in the collection.',
                ],
                'code' => <<<'EOD'
gollection.Duplicates([]int{1, 1, 2, 3, 3})
// [1,3]
EOD
            ],
            [
                'name' => 'Each',
                'description' => 'Runs a function on each element of the collection.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                    'fn' => 'A function that takes each parameter from c',
                ],
                'return' => [],
                'code' => <<<'EOD'
sum:= 0
gollection.Each([]int{1, 2, 3}, func(n int) { sum += n })
// sum = 6
EOD
            ],
            [
                'name' => 'Every',
                'description' => 'Whether all elements in the collection satisfy the given function.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                    'fn' => 'A function that takes each parameter from c',
                ],
                'return' => [
                    'A boolean value',
                ],
                'code' => <<<'EOD'
gollection.Every([]int{2, 4, 6}, func(n int) bool { return n%2 == 0 })
// true
EOD
            ],
            [
                'name' => 'Except',
                'description' => 'Returns a new slice containing the elements of c that do NOT satisfy the given function.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                    'fn' => 'A function that takes each parameter from c',
                ],
                'return' => [
                    'A new slice containing the elements of c that do NOT satisfy the given function.',
                ],
                'code' => <<<'EOD'
gollection.Except([]int{1, 2, 3}, func(n int) bool { return n == 2 })
// [1,3]
EOD
            ],
            [
                'name' => 'Filter',
                'description' => 'Returns a new slice containing the elements of c that satisfy the given function.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                    'fn' => 'A function that takes each parameter from c',
                ],
                'return' => [
                    'A new slice containing the elements of c that satisfy the given function.',
                ],
                'code' => <<<'EOD'
gollection.Filter([]int{1, 2, 3}, func(n int) bool { return n == 2 })
// [2]
EOD
            ],
            [
                'name' => 'First',
                'description' => 'Returns the first element of the collection that satisfies the given function.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                    'fn' => 'A function that takes each parameter from c',
                ],
                'return' => [
                    'A pointer to an element of the collection or nil',
                ],
                'code' => <<<'EOD'
gollection.First([]int{1, 2, 3}, func(n int) bool { return n > 2 })
// 3
EOD
            ],
            [
                'name' => 'FirstOr',
                'description' => 'Returns the first element of the collection that satisfies the given function or the default value if no element satisfies the function.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                    'fn' => 'A function that takes each parameter from c',
                    'defaultValue' => 'A value to return if no element satisfies the function',
                ],
                'return' => [
                    'A pointer to an element of the collection or to defaultValue',
                ],
                'code' => <<<'EOD'
gollection.FirstOr([]int{1, 2, 3}, func(n int) bool { return n > 3 }, 4)
// 4
EOD
            ],
            [
                'name' => 'FirstOrFail',
                'description' => 'Returns the first element of the collection that satisfies the given function or panics otherwise.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                    'fn' => 'A function that takes each parameter from c',
                ],
                'return' => [
                    'A pointer to an element of the collection or panics',
                ],
                'code' => <<<'EOD'
gollection.FirstOrFail([]int{1, 2, 3}, func(n int) bool { return n > 3 })
// panic
EOD
            ],
            [
                'name' => 'FirstWhere',
                'description' => 'Returns the first element of the collection that has the given key and value.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to check for in the collection',
                    'value' => 'The value to check for in the collection',
                ],
                'return' => [
                    'The first element of the collection that has the given key and value or nil otherwise.',
                ],
                'code' => <<<'EOD'
gollection.FirstWhere([]map[string]any{{"id": 1, "size": "S"}, {"id": 2, "size": "L"}}, "size", "L")
// {"id": 2, "size": "L"}
EOD
            ],
            [
                'name' => 'Flatten',
                'description' => 'Alias of Collapse',
                'code' => null,
            ],
            [
                'name' => 'FlattenMap',
                'description' => 'Alias of CollapseMap',
                'code' => null,
            ],
            [
                'name' => 'Flip',
                'description' => 'Flips the keys and values of a map.',
                'params' => [
                    'c' => 'A map of any type',
                ],
                'return' => [
                    'A new map with the keys and values flipped',
                ],
                'code' => <<<'EOD'
gollection.Flip(map[string]int{"a": 1, "b": 2})
// {"1": "a", "2": "b"}
EOD
            ],
            [
                'name' => 'GroupBy',
                'description' => 'Returns a map with keys being the values of key found in c and values being a subset of c which have the same value for key.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'A value of the map\'s key type',
                ],
                'return' => [
                    'A map of with keys of the type of key and values of a slice of maps.',
                ],
                'code' => <<<'EOD'
gollection.GroupBy([]map[string]string{{"t": "a", "u": "1"}, {"t": "b", "u": "2"}, {"t": "a", "u": "3"}}, "t")
// {"a": [{"t": "a", "u": "1"}, {"t": "a", "u": "3"}], "b": {"t": "b", "u": "2"}}
EOD
            ],
            [
                'name' => 'Has',
                'description' => 'Alias of Contains',
                'code' => null,
            ],
            [
                'name' => 'HasAny',
                'description' => 'Whether a slice contains any of the items in another slice.',
                'params' => [
                    'c' => 'A slice of any comparable type representing the haystack',
                    'items' => 'Another slice of the same comparable type representing the needles',
                ],
                'return' => [
                    'A boolean value.',
                ],
                'code' => <<<'EOD'
gollection.HasAny([]int{1, 2, 3}, []int{0, 3})
// true
EOD
            ],
            [
                'name' => 'HasAnyKeys',
                'description' => 'Whether a map contains any of the keys.',
                'params' => [
                    'c' => 'A map of any type',
                    'items' => 'A list of function parameters to check for existing keys in the map',
                ],
                'return' => [
                    'A boolean value.',
                ],
                'code' => <<<'EOD'
gollection.HasAnyKeys(map[string]int{"a": 1}, "a", "b")
// true
EOD
            ],
            [
                'name' => 'HasEvery',
                'description' => 'Whether a slice contains EVERY one of the items in another slice.',
                'params' => [
                    'c' => 'A slice of any comparable type representing the haystack',
                    'items' => 'Another slice of the same comparable type representing the needles',
                ],
                'return' => [
                    'A boolean value.',
                ],
                'code' => <<<'EOD'
gollection.HasEvery([]int{1, 2, 3}, []int{1, 2})
// true
EOD
            ],
            [
                'name' => 'HasOne',
                'description' => 'Whether a slice contains ONLY one of the items in another slice.',
                'params' => [
                    'c' => 'A slice of any comparable type representing the haystack',
                    'items' => 'Another slice of the same comparable type representing the needles',
                ],
                'return' => [
                    'A boolean value.',
                ],
                'code' => <<<'EOD'
gollection.HasOne([]int{1, 4, 5}, []int{1, 2, 3})
// true
gollection.HasOne([]int{1, 2, 5}, []int{1, 2, 3})
// false
EOD
            ],
            [
                'name' => 'IndexOf',
                'description' => 'Returns the index of the first occurrence of the given value in the collection or -1 if the value is not found.',
                'params' => [
                    'c' => 'A slice of any comparable type representing the haystack',
                    'item' => 'A value of the same comparable type representing the needles',
                ],
                'return' => [
                    'The index of the first occurrence, or -1 if not found',
                ],
                'code' => <<<'EOD'
gollection.IndexOf([]string{"a", "b", "c"}, "b")
// 1
gollection.IndexOf([]string{"a", "b", "c"}, "d")
// -1
EOD
            ],
            [
                'name' => 'IsEmpty',
                'description' => 'Whether a slice is empty.',
                'params' => [
                    'c' => 'A slice of any type.',
                ],
                'return' => [
                    'A boolean value.',
                ],
                'code' => <<<'EOD'
gollection.IsEmpty([]string{"a", "b", "c"})
// false
gollection.IsEmpty([]string{})
// true
EOD
            ],
            [
                'name' => 'Intersect',
                'description' => 'Returns a slice with the common elements of two slices.',
                'params' => [
                    'c' => 'A slice of any type.',
                    'other' => 'Another slice of the same type.',
                ],
                'return' => [
                    'A slice of the same type as c and other.',
                ],
                'code' => <<<'EOD'
gollection.Intersect([]int{1, 1, 2}, []int{1, 2, 2})
// [1, 2]
EOD
            ],
            [
                'name' => 'IntersectAssoc',
                'description' => 'Returns a map with the common keys and values of two maps.',
                'params' => [
                    'c' => 'A map of any type.',
                    'other' => 'Another map of the same type.',
                ],
                'return' => [
                    'A map of the same type as c and other.',
                ],
                'code' => <<<'EOD'
gollection.IntersectAssoc(map[string]int{"a": 1, "b": 2}, map[string]int{"a": 1, "b": 9})
// {"a": 1}
EOD
            ],
            [
                'name' => 'IntersectByKeys',
                'description' => 'Returns a map with the keys and values of the first map where the same keys exist in the second map.',
                'params' => [
                    'c' => 'A map of any type.',
                    'other' => 'Another map of the same type.',
                ],
                'return' => [
                    'A map of with the subset of keys and values from c',
                ],
                'code' => <<<'EOD'
gollection.IntersectByKeys(map[string]int{"a": 1, "b": 2}, map[string]int{"b": 9})
// {"b": 2}
EOD
            ],
            [
                'name' => 'KeyBy',
                'description' => 'Returns a map keyed by the value of the given key from each element in the collection.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to group by',
                ],
                'return' => [
                    'A map with keys from the given key and values as slices of matching elements',
                ],
                'code' => <<<'EOD'
gollection.KeyBy([]map[string]int{{"k": 1}, {"k": 2, "a": 3}, {"k": 2, "b": 4}}, "k")
// {1: [{"k": 1}], 2: [{"k": 2, "a": 3}, {"k": 2, "b": 4}]}
EOD
            ],
            [
                'name' => 'Last',
                'description' => 'Returns the last element of the collection that satisfies the given function.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each value and index from c and returns a boolean',
                ],
                'return' => [
                    'A pointer to an element of the collection or nil',
                ],
                'code' => <<<'EOD'
gollection.Last([]int{1, 2, 3, 4}, func(n, i int) bool { return n >= 2 })
// 4
gollection.Last([]int{1, 2, 3, 4}, func(n, i int) bool { return n > 4 })
// nil
EOD
            ],
            [
                'name' => 'LastOr',
                'description' => 'Returns the last element of the collection that satisfies the given function, or the default value if none match.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each value and index from c and returns a boolean',
                    'defaultValue' => 'A value to return if no element satisfies the function',
                ],
                'return' => [
                    'A pointer to an element of the collection or to defaultValue',
                ],
                'code' => <<<'EOD'
gollection.LastOr([]int{1, 2, 3, 4}, func(n, i int) bool { return n >= 4 }, 99)
// 4
gollection.LastOr([]int{1, 2, 3, 4}, func(n, i int) bool { return n > 4 }, 99)
// 99
EOD
            ],
            [
                'name' => 'LastOrFail',
                'description' => 'Returns the last element of the collection that satisfies the given function, or panics otherwise.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each value and index from c and returns a boolean',
                ],
                'return' => [
                    'A pointer to an element of the collection or panics',
                ],
                'code' => <<<'EOD'
gollection.LastOrFail([]int{1, 2, 3, 4}, func(n, i int) bool { return n >= 4 })
// 4
gollection.LastOrFail([]int{1, 2, 3, 4}, func(n, i int) bool { return n > 4 })
// panic
EOD
            ],
            [
                'name' => 'LastWhere',
                'description' => 'Returns the last element of the collection that has the given key and value.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to check for in the collection',
                    'value' => 'The value to check for in the collection',
                ],
                'return' => [
                    'The last matching element or nil otherwise',
                ],
                'code' => <<<'EOD'
gollection.LastWhere([]map[string]any{{"n": 1}, {"n": 2}, {"n": 2}}, "n", 2)
// {"n": 2}
gollection.LastWhere([]map[string]any{{"n": 1}, {"n": 2}, {"n": 2}}, "n", 3)
// nil
EOD
            ],
            [
                'name' => 'Length',
                'description' => 'Alias of Count',
                'code' => null,
            ],
            [
                'name' => 'Map',
                'description' => 'Transforms each element of the collection using the given function.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that transforms each element',
                ],
                'return' => [
                    'A new slice containing the transformed elements',
                ],
                'code' => <<<'EOD'
gollection.Map([]int{1, 2}, func(n int) string { return string(rune('0' + n)) })
// ["1", "2"]
EOD
            ],
            [
                'name' => 'Max',
                'description' => 'Returns the maximum value in a numeric collection.',
                'params' => [
                    'c' => 'A slice of numeric values',
                ],
                'return' => [
                    'The maximum value',
                ],
                'code' => <<<'EOD'
gollection.Max([]int{1, 3, 2, 5, 4})
// 5
EOD
            ],
            [
                'name' => 'Mode',
                'description' => 'Returns the most frequently occurring value(s) in the collection.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                ],
                'return' => [
                    'A slice of the most common value(s)',
                ],
                'code' => <<<'EOD'
gollection.Mode([]int{1, 2, 1, 2, 3, 2})
// ["1", "2"]
EOD
            ],
            [
                'name' => 'Min',
                'description' => 'Returns the minimum value in a numeric collection.',
                'params' => [
                    'c' => 'A slice of numeric values',
                ],
                'return' => [
                    'The minimum value',
                ],
                'code' => <<<'EOD'
gollection.Min([]int{3, 2, 5, 4})
// 2
EOD
            ],
            [
                'name' => 'Multiply',
                'description' => 'Repeats each element in the collection a given number of times.',
                'params' => [
                    'c' => 'A slice of any type',
                    'times' => 'A positive integer',
                ],
                'return' => [
                    'A new slice with each element repeated the given number of times',
                ],
                'code' => <<<'EOD'
gollection.Multiply([]int{1, 2}, 3)
// [1, 1, 1, 2, 2, 2]
EOD
            ],
            [
                'name' => 'Nth',
                'description' => 'Returns the element at the given index.',
                'params' => [
                    'c' => 'A slice of any type',
                    'index' => 'A non-negative integer index',
                ],
                'return' => [
                    'The element at the given index',
                ],
                'code' => <<<'EOD'
gollection.Nth([]string{"a", "b"}, 1)
// "b"
EOD
            ],
            [
                'name' => 'NthFromLast',
                'description' => 'Returns the element at the given index from the end of the collection.',
                'params' => [
                    'c' => 'A slice of any type',
                    'index' => 'A non-negative integer index from the end',
                ],
                'return' => [
                    'The element at the given index from the end',
                ],
                'code' => <<<'EOD'
gollection.NthFromLast([]string{"a", "b"}, 1)
// "a"
EOD
            ],
            [
                'name' => 'Only',
                'description' => 'Returns a slice of maps containing only the specified keys from each element.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'keys' => 'One or more keys to keep',
                ],
                'return' => [
                    'A new slice of maps with only the specified keys',
                ],
                'code' => <<<'EOD'
gollection.Only([]map[string]int{{"a": 1, "b": 2}, {"a": 3, "b": 4, "c": 5}}, "a", "b")
// [{"a": 1, "b": 2}, {"a": 3, "b": 4}]
EOD
            ],
            [
                'name' => 'PadLeft',
                'description' => 'Pads the beginning of the collection with the given value until it reaches the given length.',
                'params' => [
                    'c' => 'A slice of any type',
                    'length' => 'The target length of the padded slice',
                    'value' => 'The value to pad with',
                ],
                'return' => [
                    'A new padded slice',
                ],
                'code' => <<<'EOD'
gollection.PadLeft([]int{1}, 2, 0)
// [0, 0, 1]
EOD
            ],
            [
                'name' => 'PadRight',
                'description' => 'Pads the end of the collection with the given value until it reaches the given length.',
                'params' => [
                    'c' => 'A slice of any type',
                    'length' => 'The target length of the padded slice',
                    'value' => 'The value to pad with',
                ],
                'return' => [
                    'A new padded slice',
                ],
                'code' => <<<'EOD'
gollection.PadRight([]int{1}, 4, 3)
// [1, 3, 3, 3, 3]
EOD
            ],
            [
                'name' => 'Partition',
                'description' => 'Splits the collection into two slices based on the given function.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes index and value and returns a boolean',
                ],
                'return' => [
                    'Two slices: elements that matched the function, then those that did not',
                ],
                'code' => <<<'EOD'
gollection.Partition([]int{1, 2, 3, 4}, func(i, n int) bool { return n%2 == 0 })
// [[2,4], [1,3]]
gollection.Partition([]int{1, 2, 3, 4}, func(i, n int) bool { return i < 2 })
// [[1,2], [3,4]]
EOD
            ],
            [
                'name' => 'Percentage',
                'description' => 'Returns the percentage of elements in the collection that satisfy the given function.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each element and returns a boolean',
                ],
                'return' => [
                    'An integer percentage from 0 to 100',
                ],
                'code' => <<<'EOD'
gollection.Percentage([]int{1, 2, 3, 4}, func(n int) bool { return n%2 == 0 })
// 50
EOD
            ],
            [
                'name' => 'Prepend',
                'description' => 'Prepends the given values to the beginning of the collection.',
                'params' => [
                    'c' => 'A slice of any type',
                    'values' => 'One or more values to prepend',
                ],
                'return' => [
                    'A new slice with the values prepended',
                ],
                'code' => <<<'EOD'
gollection.Prepend([]int{3, 4}, 1, 2)
// [1, 2, 3, 4]
EOD
            ],
            [
                'name' => 'Push',
                'description' => 'Appends a single value to the end of the collection.',
                'params' => [
                    'c' => 'A slice of any type',
                    'value' => 'The value to append',
                ],
                'return' => [
                    'A new slice with the value appended',
                ],
                'code' => <<<'EOD'
gollection.Push([]int{3, 4}, 1)
// [3, 4, 1]
EOD
            ],
            [
                'name' => 'Pop',
                'description' => 'Removes and returns the last element of the collection.',
                'params' => [
                    'c' => 'A slice of any type',
                ],
                'return' => [
                    'The last element and the remaining slice',
                    'A copy of the slice without the last element',
                ],
                'code' => <<<'EOD'
gollection.Pop([]int{3, 4, 1})
// 1, [3, 4]
EOD
            ],
            [
                'name' => 'Random',
                'description' => 'Returns a random element from the collection.',
                'params' => [
                    'c' => 'A non-empty slice of any type',
                ],
                'return' => [
                    'A random element and nil, or nil and an error if the collection is empty',
                ],
                'code' => <<<'EOD'
gollection.Random([]int{1, 2, 3, 4, 5})
// 4, nil
gollection.Random([]int{})
// nil, Error
EOD
            ],
            [
                'name' => 'Range',
                'description' => 'Returns a slice of elements between the given start and end indices.',
                'params' => [
                    'c' => 'A slice of any type',
                    'start' => 'The starting index (inclusive)',
                    'end' => 'The ending index (exclusive)',
                ],
                'return' => [
                    'A slice of elements in the range, or an error if start is greater than end',
                ],
                'code' => <<<'EOD'
gollection.Range([]int{0, 1, 2, 3, 4, 5}, 2, 4)
// [2, 3], nil
gollection.Range([]int{0, 1, 2, 3, 4, 5}, 4, 2)
// nil, Error
EOD
            ],
            [
                'name' => 'Reduce',
                'description' => 'Reduces the collection to a single value using the given function.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that combines the accumulator with each element',
                    'initial' => 'The initial accumulator value',
                ],
                'return' => [
                    'The reduced value',
                ],
                'code' => <<<'EOD'
gollection.Reduce([]int{1, 2, 3}, func(acc, n int) int { return acc + n }, 0)
// 6
EOD
            ],
            [
                'name' => 'ReduceWithIndex',
                'description' => 'Reduces the collection to a single value using a function that receives the index.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that combines the accumulator with each element and its index',
                    'initial' => 'The initial accumulator value',
                ],
                'return' => [
                    'The reduced value',
                ],
                'code' => <<<'EOD'
gollection.ReduceWithIndex([]int{1, 2, 3}, func(acc, n, i int) int { return acc + i }, 0)
// 3
EOD
            ],
            [
                'name' => 'Reject',
                'description' => 'Returns a new slice excluding elements that satisfy the given function.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each element and returns a boolean',
                ],
                'return' => [
                    'A new slice of elements that did not satisfy the function',
                ],
                'code' => <<<'EOD'
gollection.Reject([]int{1, 2, 3}, func(n int) bool { return n == 2 })
// [1, 3]
EOD
            ],
            [
                'name' => 'RejectWithIndex',
                'description' => 'Returns a new slice excluding elements that satisfy the given function, with index access.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each element and index and returns a boolean',
                ],
                'return' => [
                    'A new slice of elements that did not satisfy the function',
                ],
                'code' => <<<'EOD'
gollection.RejectWithIndex([]int{1, 2, 3}, func(n, i int) bool { return i == 2 })
// [1, 2]
EOD
            ],
            [
                'name' => 'Replace',
                'description' => 'Replaces elements in the collection at the given indices with new values.',
                'params' => [
                    'c' => 'A slice of any type',
                    'replacements' => 'A map of index to replacement value',
                ],
                'return' => [
                    'A new slice with the replacements applied',
                ],
                'code' => <<<'EOD'
gollection.Replace([]int{1, 2, 3, 4, 5}, map[int]int{1: 9, 3: 10})
// [1, 9, 3, 10, 5]
EOD
            ],
            [
                'name' => 'Reverse',
                'description' => 'Reverses the order of elements in the collection.',
                'params' => [
                    'c' => 'A slice of any type',
                ],
                'return' => [
                    'A new slice with elements in reverse order',
                ],
                'code' => <<<'EOD'
gollection.Reverse([]int{1, 2, 3, 4, 5})
// [5, 4, 3, 2, 1]
EOD
            ],
            [
                'name' => 'ReverseMap',
                'description' => 'Swaps the keys and values of a map.',
                'params' => [
                    'c' => 'A map with comparable values',
                ],
                'return' => [
                    'A new map with keys and values reversed',
                ],
                'code' => <<<'EOD'
gollection.ReverseMap(map[int]string{1: "x", 3: "y"})
// {"x": 1, "y": 3}
EOD
            ],
            [
                'name' => 'Select',
                'description' => 'Returns a slice of maps containing only the specified keys from each element.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'keys' => 'One or more keys to select',
                ],
                'return' => [
                    'A new slice of maps with only the selected keys',
                ],
                'code' => <<<'EOD'
gollection.Select([]map[string]any{{"a": 1, "b": "x", "c": 2.0}, {"a": 2, "b": "y", "c": 1.5}}, "a", "b")
// [{"a": 1, "b": "x"}, {"a": 2, "b": "y"}]
EOD
            ],
            [
                'name' => 'Shuffle',
                'description' => 'Returns a new slice with the elements in random order.',
                'params' => [
                    'c' => 'A slice of any type',
                ],
                'return' => [
                    'A new shuffled slice',
                ],
                'code' => <<<'EOD'
gollection.Shuffle([]int{1, 2, 3, 4, 5})
// [4, 1, 3, 5, 2]
EOD
            ],
            [
                'name' => 'Skip',
                'description' => 'Skips the first n elements of the collection.',
                'params' => [
                    'c' => 'A slice of any type',
                    'count' => 'The number of elements to skip',
                ],
                'return' => [
                    'A new slice without the first n elements',
                ],
                'code' => <<<'EOD'
gollection.Skip([]int{1, 1, 1, 2, 3}, 2)
// [1, 2, 3]
EOD
            ],
            [
                'name' => 'SkipUntil',
                'description' => 'Skips elements until the given function returns true, then returns the rest.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each element and returns a boolean',
                ],
                'return' => [
                    'A new slice starting from the first matching element',
                ],
                'code' => <<<'EOD'
gollection.SkipUntil([]int{1, 2, 3}, func(n int) bool { return n == 2 })
// [2, 3]
EOD
            ],
            [
                'name' => 'SkipWhile',
                'description' => 'Skips elements while the given function returns true, then returns the rest.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each element and returns a boolean',
                ],
                'return' => [
                    'A new slice starting after elements that matched',
                ],
                'code' => <<<'EOD'
gollection.SkipWhile([]int{1, 2, 1}, func(n int) bool { return n < 2 })
// [2, 1]
EOD
            ],
            [
                'name' => 'Slice',
                'description' => 'Returns a slice of elements between the given start and end indices.',
                'params' => [
                    'c' => 'A slice of any type',
                    'start' => 'The starting index (inclusive)',
                    'end' => 'The ending index (exclusive)',
                ],
                'return' => [
                    'A new slice containing elements in the range',
                ],
                'code' => <<<'EOD'
gollection.Slice([]int{1, 2, 3, 4, 5}, 1, 3)
// [2, 3]
EOD
            ],
            [
                'name' => 'Sort',
                'description' => 'Sorts the collection in ascending or descending order.',
                'params' => [
                    'c' => 'A slice of ordered values',
                    'direction' => 'Sort direction (SortDirectionAsc or SortDirectionDesc)',
                ],
                'return' => [
                    'A new sorted slice',
                ],
                'code' => <<<'EOD'
gollection.Sort([]int{3, 1, 2}, gollection.SortDirectionAsc)
// [1, 2, 3]
gollection.Sort([]int{1, 3, 2}, gollection.SortDirectionDesc)
// [3, 2, 1]
EOD
            ],
            [
                'name' => 'SortAsc',
                'description' => 'Sorts the collection in ascending order.',
                'params' => [
                    'c' => 'A slice of ordered values',
                ],
                'return' => [
                    'A new slice sorted in ascending order',
                ],
                'code' => <<<'EOD'
gollection.SortAsc([]int{2, 1})
// [1, 2]
EOD
            ],
            [
                'name' => 'SortBy',
                'description' => 'Sorts a slice of maps by the given key in the specified direction.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to sort by',
                    'direction' => 'Sort direction (SortDirectionAsc or SortDirectionDesc)',
                ],
                'return' => [
                    'A new sorted slice of maps',
                ],
                'code' => <<<'EOD'
gollection.SortBy([]map[string]int{{"v": 2}, {"v": 1}}, "v", gollection.SortDirectionAsc)
// [{"v": 1}, {"v": 2}]
EOD
            ],
            [
                'name' => 'SortByAsc',
                'description' => 'Sorts a slice of maps by the given key in ascending order.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to sort by',
                ],
                'return' => [
                    'A new slice of maps sorted in ascending order by key',
                ],
                'code' => <<<'EOD'
gollection.SortByAsc([]map[string]int{{"v": 3}, {"v": 1}}, "v")
// [{"v": 1}, {"v": 3}]
EOD
            ],
            [
                'name' => 'SortByDesc',
                'description' => 'Sorts a slice of maps by the given key in descending order.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to sort by',
                ],
                'return' => [
                    'A new slice of maps sorted in descending order by key',
                ],
                'code' => <<<'EOD'
gollection.SortByDesc([]map[string]int{{"v": 1}, {"v": 3}}, "v")
// [{"v": 3}, {"v": 1}]
EOD
            ],
            [
                'name' => 'SortDesc',
                'description' => 'Sorts the collection in descending order.',
                'params' => [
                    'c' => 'A slice of ordered values',
                ],
                'return' => [
                    'A new slice sorted in descending order',
                ],
                'code' => <<<'EOD'
gollection.SortDesc([]int{1, 3, 2})
// [3, 2, 1]
EOD
            ],
            [
                'name' => 'Splice',
                'description' => 'Removes elements from the collection and optionally inserts new values at that position.',
                'params' => [
                    'c' => 'A slice of any type',
                    'start' => 'The index at which to begin changing the slice',
                    'deleteCount' => 'The number of elements to remove',
                    'values' => 'Optional values to insert at start',
                ],
                'return' => [
                    'A new slice with elements removed and inserted',
                ],
                'code' => <<<'EOD'
gollection.Splice([]int{1, 2, 3, 4}, 1, 2, 9, 9)
// [1, 9, 9, 4]
EOD
            ],
            [
                'name' => 'Split',
                'description' => 'Splits the collection into chunks of the given size.',
                'params' => [
                    'c' => 'A slice of any type',
                    'size' => 'A positive integer chunk size',
                ],
                'return' => [
                    'A slice of slices, each of the given size (the last may be smaller)',
                ],
                'code' => <<<'EOD'
gollection.Split([]int{1, 2, 3, 4, 5}, 2)
// [[1, 2], [3, 4], [5]]
EOD
            ],
            [
                'name' => 'SplitInto',
                'description' => 'Splits the collection into a given number of roughly equal parts.',
                'params' => [
                    'c' => 'A slice of any type',
                    'parts' => 'The number of parts to split into',
                ],
                'return' => [
                    'A slice of slices divided into the given number of parts',
                ],
                'code' => <<<'EOD'
gollection.SplitInto([]int{1, 2, 3, 4, 5, 6}, 2)
// [[1, 2, 3], [4, 5, 6]]
EOD
            ],
            [
                'name' => 'Take',
                'description' => 'Returns the first n elements of the collection.',
                'params' => [
                    'c' => 'A slice of any type',
                    'count' => 'The number of elements to take',
                ],
                'return' => [
                    'A new slice containing the first n elements',
                ],
                'code' => <<<'EOD'
gollection.Take([]int{1, 2, 3}, 2)
// [1, 2]
EOD
            ],
            [
                'name' => 'TakeUntil',
                'description' => 'Takes elements until the given function returns true (exclusive).',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each element and returns a boolean',
                ],
                'return' => [
                    'A new slice of elements before the first match',
                ],
                'code' => <<<'EOD'
gollection.TakeUntil([]int{1, 2, 3}, func(n int) bool { return n == 2 })
// [1]
EOD
            ],
            [
                'name' => 'TakeWhile',
                'description' => 'Takes elements while the given function returns true.',
                'params' => [
                    'c' => 'A slice of any type',
                    'fn' => 'A function that takes each element and returns a boolean',
                ],
                'return' => [
                    'A new slice of elements while the function matched',
                ],
                'code' => <<<'EOD'
gollection.TakeWhile([]int{1, 2, 3}, func(n int) bool { return n < 3 })
// [1, 2]
EOD
            ],
            [
                'name' => 'Union',
                'description' => 'Returns a slice containing the unique elements from both collections.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                    'other' => 'Another slice of the same type',
                ],
                'return' => [
                    'A new slice with unique elements from both slices',
                ],
                'code' => <<<'EOD'
gollection.Union([]int{1, 2}, []int{2, 3})
// [1, 2, 3]
EOD
            ],
            [
                'name' => 'Unique',
                'description' => 'Returns a slice containing only the unique values from the collection.',
                'params' => [
                    'c' => 'A slice of any comparable type',
                ],
                'return' => [
                    'A new slice with duplicate values removed',
                ],
                'code' => <<<'EOD'
gollection.Unique([]int{1, 1, 2, 3, 3})
// [2]
EOD
            ],
            [
                'name' => 'Where',
                'description' => 'Filters a slice of maps to elements where the given key equals the given value.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to match',
                    'value' => 'The value to match',
                ],
                'return' => [
                    'A new slice of matching maps',
                ],
                'code' => <<<'EOD'
gollection.Where([]map[string]int{{"k": 1}, {"k": 2}}, "k", 2)
// [{"k": 2}]
EOD
            ],
            [
                'name' => 'WhereBetween',
                'description' => 'Filters a slice of maps to elements where the given key is between two values (inclusive).',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to compare',
                    'min' => 'The minimum value (inclusive)',
                    'max' => 'The maximum value (inclusive)',
                ],
                'return' => [
                    'A new slice of matching maps',
                ],
                'code' => <<<'EOD'
gollection.WhereBetween([]map[string]int{{"x": 2}, {"x": 5}, {"x": 10}}, "x", 2, 5)
// [{"x": 2}, {"x": 5}]
EOD
            ],
            [
                'name' => 'WhereIn',
                'description' => 'Filters a slice of maps to elements where the given key is in the provided values.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to compare',
                    'values' => 'A slice of values to match against',
                ],
                'return' => [
                    'A new slice of matching maps',
                ],
                'code' => <<<'EOD'
gollection.WhereIn([]map[string]int{{"t": 1}, {"t": 9}}, "t", []int{9})
// [{"t": 9}]
EOD
            ],
            [
                'name' => 'WhereNot',
                'description' => 'Filters a slice of maps to elements where the given key does not equal the given value.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to compare',
                    'value' => 'The value to exclude',
                ],
                'return' => [
                    'A new slice of matching maps',
                ],
                'code' => <<<'EOD'
gollection.WhereNot([]map[string]int{{"t": 1}, {"t": 2}}, "t", 1)
// [{"t": 2}]
EOD
            ],
            [
                'name' => 'WhereNotBetween',
                'description' => 'Filters a slice of maps to elements where the given key is not between two values.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to compare',
                    'min' => 'The minimum value of the range',
                    'max' => 'The maximum value of the range',
                ],
                'return' => [
                    'A new slice of matching maps',
                ],
                'code' => <<<'EOD'
gollection.WhereNotBetween([]map[string]int{{"x": 1}, {"x": 4}, {"x": 7}}, "x", 3, 6)
// [{"x": 1}, {"x": 7}]
EOD
            ],
            [
                'name' => 'WhereNotIn',
                'description' => 'Filters a slice of maps to elements where the given key is not in the provided values.',
                'params' => [
                    'c' => 'A slice of maps of any type',
                    'key' => 'The key to compare',
                    'values' => 'A slice of values to exclude',
                ],
                'return' => [
                    'A new slice of matching maps',
                ],
                'code' => <<<'EOD'
gollection.WhereNotIn([]map[string]int{{"t": 1}, {"t": 2}}, "t", []int{1})
// [{"t": 2}]
EOD
            ],
            [
                'name' => 'Zip',
                'description' => 'Combines two slices into a slice of pairs.',
                'params' => [
                    'c' => 'A slice of any type',
                    'other' => 'Another slice of any type',
                ],
                'return' => [
                    'A slice of pairs, one element from each slice',
                ],
                'code' => <<<'EOD'
gollection.Zip([]int{1, 2}, []string{"a", "b"})
// [[1, "a"], [2, "b"]]
EOD
            ],
        ]);
    }
}