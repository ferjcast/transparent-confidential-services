package util

import "strings"

func TrimLeadingSlash(s string) string {
	if len(s) > 0 && s[0] == '/' {
		return s[1:]
	}
	return s
}

// StripResourceName splits a GCP-style resource URI and returns its final segment.
func StripResourceName(fullPath string) string {
	parts := strings.Split(fullPath, "/")
	if len(parts) == 0 {
		return fullPath
	}
	return parts[len(parts)-1]
}
