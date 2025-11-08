package main

import (
	"backend/internal/api/handlers"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func main() {
	router := chi.NewRouter()

	//router.Get("/", func(w http.ResponseWriter, r *http.Request) {
	//	fmt.Fprintf(w, "Movie API Response")
	//})

	handlers.MovieHandler(router)

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatal(err)
	}

}
