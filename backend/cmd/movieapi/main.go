package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func main() {

	router := gin.Default()

	fmt.Println("Starting GO TMDB API service")

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"response": "Successful response!!"})
	})

	err := router.Run(":8080")

	if err != nil {
		log.Fatal(err)
	}

}
