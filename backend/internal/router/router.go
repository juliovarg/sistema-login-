package router

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/leoferamos/aroma-sense/internal/handler"
)

// SetupRouter initializes the Gin router with all routes
func SetupRouter(userHandler *handler.UserHandler, productHandler *handler.ProductHandler) *gin.Engine {
	r := gin.Default()

	// Enable CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge:           12 * time.Hour,
		AllowCredentials: true,
	}))

	// Health check
	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Register domain routes
	UserRoutes(r, userHandler)
	AdminRoutes(r, userHandler, productHandler)
	ProductRoutes(r, productHandler)

	return r
}
