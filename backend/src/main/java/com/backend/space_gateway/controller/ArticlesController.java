package com.backend.space_gateway.controller;

import com.backend.space_gateway.model.ArticlesResponse;
import com.backend.space_gateway.service.ArticlesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "http://localhost:3001") // Adjust as needed
public class ArticlesController {

    private final ArticlesService articlesService;

    public ArticlesController(ArticlesService articlesService) {
        this.articlesService = articlesService;
    }

    @GetMapping("/spaceflight-news")
    public ResponseEntity<ArticlesResponse> getSpaceflightNews() {
        ArticlesResponse articles = articlesService.getLatestArticles();
        return ResponseEntity.ok(articles);
    }
}
