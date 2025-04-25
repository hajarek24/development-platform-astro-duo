package com.backend.space_gateway.controller;


import com.backend.space_gateway.model.PlanetResponse;
import com.backend.space_gateway.service.PlanetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planets")
@CrossOrigin(origins = "http://localhost:3001") // Adjust to your frontend URL
public class PlanetController {

    private final PlanetService planetService;

    public PlanetController(PlanetService planetService) {
        this.planetService = planetService;
    }

    @GetMapping
    public ResponseEntity<List<PlanetResponse>> getAllPlanets() {
        List<PlanetResponse> planets = planetService.getAllPlanets();
        return ResponseEntity.ok(planets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanetResponse> getPlanetById(@PathVariable String id) {
        PlanetResponse planet = planetService.getPlanetById(id);
        if (planet == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(planet);
    }
}
