package main

import "strings"

func simplifyPath(path string) string {
	paths := strings.Split(path, "/")
	simplePaths := []string{}
	for _, path := range paths {
		if path == "" {
			continue
		} else if path == "." {
			continue
		} else if path == ".." {
			if len(simplePaths) == 0 {
				continue
			} else {
				simplePaths = simplePaths[:len(simplePaths)-1]
			}
		} else {
			simplePaths = append(simplePaths, path)
		}
	}
	simplePath := strings.Join(simplePaths, "/")
	simplePath = "/" + simplePath
	return simplePath
}
