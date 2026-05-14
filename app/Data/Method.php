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
                'code' => <<<'EOD'
gollection.Append([]int{1, 2, 3}, 4, 5, 6)
// [1, 2, 3, 4, 5, 6]
EOD
            ],
            [
                'name' => 'At',
                'description' => 'Returns the value at the given index.',
                'code' => <<<'EOD'
gollection.At([]int{1, 2, 3}, 1)
// 2, nil
EOD
            ],
            [
                'name' => 'Average',
                'description' => 'Returns the average of the collection. Elements must be numeric.',
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
                'code' => <<<'EOD'
gollection.Chunk([]int{1, 2, 3, 4, 5, 6}, 3)
// [[1, 2, 3], [4, 5, 6]]
EOD
            ],
            [
                'name' => 'ChunkBy',
                'description' => 'Splits the collection into chunks of the given size, grouped by the given function that returns a boolean value.'.
                'The function should return false if the current item belongs to the last chunk or true if it belongs to the next new chunk.',
                'code' => <<<'EOD'
gollection.ChunkBy([]int{1, 2, 3, 4, 5, 6}, func(n int) bool { return n%2 == 1 })
// [[1, 2], [3, 4], [5, 6]]
EOD
            ],
            [
                'name' => 'Collapse',
                'description' => 'Flattens a collection of slices into a single, flat slice.',
                'code' => <<<'EOD'
gollection.Collapse([][]int{{1, 2}, {3, 4}, {5, 6}})
// [1, 2, 3, 4, 5, 6]
EOD
            ],
            [
                'name' => 'CollapseMap',
                'description' => 'collapse map',
                'code' => <<<'EOD'
gollection.CollapseMap([]map[string]int{{"a": 1, "c": 4}, {"b": 2, "a": 3}})
// {"a": 3, "b": 2, "c": 4}
EOD
            ],
            [
                'name' => 'Combine',
                'description' => 'combine',
                'code' => <<<'EOD'
gollection.Combine([]string{"a", "b"}, []int{1, 2})
// {"a": 1, "b": 2}
EOD
            ],
            [
                'name' => 'CombineMap',
                'description' => 'combine map',
                'code' => <<<'EOD'
gollection.CombineMap(map[string]int{"a": 1}, map[string]int{"b": 2, "a": 3})
// {"a": 3, "b": 2}
EOD
            ],
            [
                'name' => 'Contains',
                'description' => 'contains',
                'code' => <<<'EOD'
gollection.Contains([]int{1, 2, 3, 4}, 4)
// true
EOD
            ],
            [
                'name' => 'ContainsKey',
                'description' => 'contains key',
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
                'description' => 'counby key',
                'code' => <<<'EOD'
gollection.CountBy([]int{1, 2, 3, 4}, func(x int) bool { return x%2 == 0 })
// 2
EOD
            ],
            [
                'name' => 'Counts',
                'description' => 'counts',
                'code' => <<<'EOD'
gollection.Counts([]string{"a", "a", "b"})
// {"a": 2, "b": 1}
EOD
            ],
            [
                'name' => 'CrossJoin',
                'description' => 'cross join',
                'code' => <<<'EOD'
gollection.CrossJoin([]int{1, 2, 3}, []string{"x", "y"})
// [[1, "x"], [1, "y"], [2, "x"], [2, "y"], [3, "x"], [3, "y"]]
EOD
            ],
            [
                'name' => 'Diff',
                'description' => 'diff',
                'code' => <<<'EOD'
gollection.Diff([]int{1, 2, 3}, []int{2})
// [1,3]
EOD
            ],
            [
                'name' => 'DiffAssoc',
                'description' => 'diff assoc',
                'code' => <<<'EOD'
gollection.DiffAssoc(map[string]int{"a": 1, "b": 3}, map[string]int{"a": 1, "b": 2})
// {"b": 3}
EOD
            ],
            [
                'name' => 'DiffKeys',
                'description' => 'diff keys',
                'code' => <<<'EOD'
gollection.DiffKeys(map[string]int{"a": 1, "b": 2}, map[string]int{"b": 3})
// ["a"]
EOD
            ],
            [
                'name' => 'DoesntContain',
                'description' => 'doesnt contain',
                'code' => <<<'EOD'
gollection.DoesntContain([]int{1, 3, 4, 5}, 2)
// true
EOD
            ],
            [
                'name' => 'Duplicates',
                'description' => 'duplicates',
                'code' => <<<'EOD'
gollection.Duplicates([]int{1, 1, 2, 3, 3})
// [1,3]
EOD
            ],
            [
                'name' => 'Each',
                'description' => 'each',
                'code' => <<<'EOD'
sum:= 0
gollection.Each([]int{1, 2, 3}, func(n int) { sum += n })
// sum = 6
EOD
            ],
            [
                'name' => 'Every',
                'description' => 'every',
                'code' => <<<'EOD'
gollection.Every([]int{2, 4, 6}, func(n int) bool { return n%2 == 0 })
// true
EOD
            ],
            [
                'name' => 'Except',
                'description' => 'except',
                'code' => <<<'EOD'
gollection.Except([]int{1, 2, 3}, func(n int) bool { return n == 2 })
// [1,3]
EOD
            ],
            [
                'name' => 'Filter',
                'description' => 'filter',
                'code' => <<<'EOD'
gollection.Filter([]int{1, 2, 3}, func(n int) bool { return n == 2 })
// [2]
EOD
            ],
            [
                'name' => 'First',
                'description' => 'fitst',
                'code' => <<<'EOD'
gollection.First([]int{1, 2, 3}, func(n, i int) bool { return n > 2 })
// 3
EOD
            ],



        ]);
    }
}