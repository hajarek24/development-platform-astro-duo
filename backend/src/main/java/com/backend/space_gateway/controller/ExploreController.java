package com.backend.space_gateway.controller;

import com.backend.space_gateway.model.SpaceMission;
import com.backend.space_gateway.model.SpaceEvent;
import com.backend.space_gateway.service.ExploreService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/explore")
@CrossOrigin(origins = "*") // Adjust as needed for your frontend
public class ExploreController {

    private final ExploreService exploreService;

    public ExploreController(ExploreService exploreService) {
        this.exploreService = exploreService;
    }

    @GetMapping("/missions")
    public ResponseEntity<List<SpaceMission>> getMissions() {
        return ResponseEntity.ok(exploreService.getUpcomingMissions());
    }

    @GetMapping("/events")
    public ResponseEntity<List<SpaceEvent>> getEvents() {
        return ResponseEntity.ok(exploreService.getUpcomingEvents());
    }
}