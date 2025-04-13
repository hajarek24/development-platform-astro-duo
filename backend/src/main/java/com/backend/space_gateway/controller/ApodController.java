package com.backend.space_gateway.controller;

import com.backend.space_gateway.model.ApodResponse;
import com.backend.space_gateway.service.ApodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/apod")
@CrossOrigin(origins = "http://localhost:3000") // Adjust this to your frontend URL
public class ApodController {

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