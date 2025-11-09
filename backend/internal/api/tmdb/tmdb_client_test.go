package tmdb

import (
	"backend/internal/api/model"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"testing"
)

// Creates a client for the tests
func CreateTestClient() (*TMDBClient, error) {

	//Get the API key, be sure to set in the test environment variables
	apiKey := os.Getenv("TMDB_KEY")

	if apiKey == "" {
		return nil, fmt.Errorf("TMDB_KEY not set")
	}

	return &TMDBClient{
		APIKey:     apiKey,
		HTTPClient: &http.Client{},
	}, nil

}

// Tests the creation of a TMDBClient
func TestTMDBClientCreateClient(t *testing.T) {
	_, err := CreateTestClient()

	if err != nil {
		t.Errorf("Attempted to create a TMDB client, got an error: %s", err)
	}
}

// Tests getting trending movies by day
func TestTMDBClientGetTrendingMoviesByDay(t *testing.T) {
	client, err := CreateTestClient()
	if err != nil {
		t.Error(err)
	}

	resp, err := client.GetTrendingMovies("day")
	if err != nil {
		t.Fatal(err)
	}

	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(resp.Body)

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected 200 status, instead got status %d with API Key %v", resp.StatusCode, client.APIKey)
	}

	body, _ := io.ReadAll(resp.Body)
	if len(body) == 0 {
		t.Error("Expected trending movies, instead got empty body in response")
	}
}

// Tests getting trending movies by day
func TestTMDBClientGetTrendingMoviesByWeek(t *testing.T) {
	client, err := CreateTestClient()
	if err != nil {
		t.Error(err)
	}

	resp, err := client.GetTrendingMovies("week")
	if err != nil {
		t.Fatal(err)
	}

	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(resp.Body)

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected 200 status, instead got %d with API Key %v", resp.StatusCode, client.APIKey)
	}

	body, _ := io.ReadAll(resp.Body)
	if len(body) == 0 {
		t.Error("Expected trending movies, instead got empty body in response")
	}
}

// Tests getting movie details
func TestTMDBClientGetMovieDetails(t *testing.T) {

	client, err := CreateTestClient()

	movieID := "11" //movie id to test with

	if err != nil {
		t.Errorf("Attempted to create a TMDB client, got an error: %s", err)
	}

	resp, err := client.GetMovieDetails(movieID)
	if err != nil {
		t.Fatal(err)
	}

	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(resp.Body)

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected 200 status, instead got status %d with API Key %v", resp.StatusCode, client.APIKey)
	}

	body, _ := io.ReadAll(resp.Body)
	if len(body) == 0 {
		t.Errorf("Expected movie details for id %v, instead got empty body in response", movieID)
	}

}

// Tests getting movie details from response
func TestReadingMovieDetailsResponse(t *testing.T) {
	movieID := "12"
	client, err := CreateTestClient()

	if err != nil {
		t.Errorf("Attempted to create a TMDB client, got an error: %s", err)
	}

	resp, err := client.GetMovieDetails(movieID)
	if err != nil {
		t.Fatal(err)
	}

	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(resp.Body)

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected 200 status, instead got status %d with API Key %v", resp.StatusCode, client.APIKey)
	}

	//Now try reading the response and putting it in a Movie struct
	var movieData model.Movie
	err = json.NewDecoder(resp.Body).Decode(&movieData)
	if err != nil {
		t.Fatal(err)
	}

	//Convert id to int
	movieIDNum, err := strconv.Atoi(movieID)
	if err != nil {
		t.Fatal(err)
	}

	//Compare response id to request id, if they are not the same,
	//Something probably went wrong
	if movieIDNum != movieData.ID {
		t.Errorf("Expected ID of %v, got %v", movieIDNum, movieData.ID)
	}

}
