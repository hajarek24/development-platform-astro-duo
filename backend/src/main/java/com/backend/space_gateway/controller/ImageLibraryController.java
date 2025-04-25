package com.backend.space_gateway.controller;

import com.backend.space_gateway.model.ImageLibraryResponse;
import com.backend.space_gateway.service.ImageLibraryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:3001") // Adjust this to your frontend URL
public class ImageLibraryController {

    private final ImageLibraryService imageLibraryService;

    public ImageLibraryController(ImageLibraryService imageLibraryService) {
        this.imageLibraryService = imageLibraryService;
    }

    @GetMapping("/search")
    public Mono<ResponseEntity<ImageLibraryResponse>> searchImages(
            @RequestParam String query,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        return imageLibraryService.searchImages(query, page, pageSize)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/articles")
    public Mono<ResponseEntity<ImageLibraryResponse>> getArticles(
            @RequestParam(defaultValue = "10") int count) {
        return imageLibraryService.getLatestArticles(count)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}