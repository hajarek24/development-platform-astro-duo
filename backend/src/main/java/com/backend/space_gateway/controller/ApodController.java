package com.backend.space_gateway.controller;

import com.backend.space_gateway.model.ApodResponse;
import com.backend.space_gateway.service.ApodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:3001") // ← LOCAL CORS ENABLED HERE
@RestController
@RequestMapping("/api/apod")
public class ApodController {
// hello
    private final ApodService apodService;

    public ApodController(ApodService apodService) {
        this.apodService = apodService;
    }

    @GetMapping
    public Mono<ResponseEntity<ApodResponse>> getApod() {
        return apodService.getAstronomyPictureOfDay()
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
