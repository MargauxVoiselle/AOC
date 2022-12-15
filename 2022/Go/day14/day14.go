package main

import (
	_ "embed"
	"strconv"
	"strings"
)

//go:embed example.txt
var example string

func buildPairs(s string) (int, int) {
	xy := strings.Split(s, ",")
	x, _ := strconv.Atoi(xy[0])
	y, _ := strconv.Atoi(xy[1])
	return x, y
}

func min(a, b int) int {
	if a < b {
		return a
	} else {
		return b
	}
}

func max(a, b int) int {
	if a < b {
		return b
	} else {
		return a
	}
}

type Grid map[Pos]byte

type Pos struct {
	X int
	Y int
}

func main() {
	input := strings.TrimSuffix(example, "\n")
	lines := strings.Split(input, "\n")

	grid := map[Pos]byte{}

	for _, line := range lines {
		pairs := strings.Split(line, " -> ")
		for i := 0; i < len(pairs)-1; i++ {
			x1, y1 := buildPairs(pairs[i])
			x2, y2 := buildPairs(pairs[i+1])
			for a := min(x1, x2); a <= max(x1, x2); a++ {
				for b := min(y1, y2); b <= max(y1, y2); b++ {
					grid[Pos{a, b}] = '#'
				}
			}
		}
	}
}
