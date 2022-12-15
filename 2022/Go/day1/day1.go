package main

import (
	_ "embed"
	"fmt"
	"strconv"
	"strings"
	"time"
)

//go:embed input.txt
var input string

func parse(input string) []int {
	parts := strings.Split(input, "\n\n")
	var elves []int
	for _, elve := range parts {
		var sum int = 0
		for _, calories := range strings.Split(elve, "\n") {
			calories, _ := strconv.Atoi(calories)
			sum += calories
		}
		elves = append(elves, sum)
	}
	return elves
}

func max(a, b int) int {
	if a > b {
		return a
	} else {
		return b
	}
}

func partOne(input string) int {
	elves := parse(input)
	result := 0
	for _, calories := range elves {
		result = max(result, calories)
	}
	return result
}

func main() {
	start := time.Now()
	fmt.Println(partOne(input))
	fmt.Println(time.Since(start))
}
