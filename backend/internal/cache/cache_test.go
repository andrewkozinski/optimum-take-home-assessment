package cache

import (
	"testing"
	"time"
)

func TestCacheExpiration(t *testing.T) {
	cache := NewCache[string, int]()
	cache.Set("key1", 42, 1*time.Second)
	value, ok := cache.Get("key1")
	if !ok || value != 42 {
		t.Errorf("Expected to get value 42 for key1, got %v", value)
	}

	time.Sleep(2 * time.Second)
	_, ok = cache.Get("key1")
	if ok {
		t.Errorf("Expected key1 to be expired")
	}

}
