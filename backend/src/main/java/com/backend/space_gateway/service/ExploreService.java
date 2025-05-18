package com.backend.space_gateway.service;

import com.backend.space_gateway.model.SpaceMission;
import com.backend.space_gateway.model.SpaceEvent;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ExploreService {
    private static final String MISSIONS_URL = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10";
    private static final String EVENTS_URL = "https://ll.thespacedevs.com/2.2.0/event/upcoming/?limit=10";

    private final RestTemplate restTemplate = new RestTemplate();

    // ...existing code...
    public List<SpaceMission> getUpcomingMissions() {
        Map response = restTemplate.getForObject(MISSIONS_URL, Map.class);
        List<Map> results = (List<Map>) response.get("results");
        List<SpaceMission> missions = new ArrayList<>();
        for (Map m : results) {
            SpaceMission mission = new SpaceMission();
            mission.setName((String) m.get("name"));
            Map status = (Map) m.get("status");
            mission.setStatus(status != null ? (String) status.get("name") : "Unknown");
            mission.setLaunch_date((String) m.get("window_start"));
            Map missionDetails = (Map) m.get("mission");
            mission.setDescription(missionDetails != null ? (String) missionDetails.get("description") : "");
            Map agency = (Map) m.get("launch_service_provider");
            mission.setAgency(agency != null ? (String) agency.get("name") : "Unknown");
            mission.setImageUrl((String) m.get("image")); // <-- Add this line
            missions.add(mission);
        }
        return missions;
    }

    public List<SpaceEvent> getUpcomingEvents() {
        Map response = restTemplate.getForObject(EVENTS_URL, Map.class);
        List<Map> results = (List<Map>) response.get("results");
        List<SpaceEvent> events = new ArrayList<>();
        for (Map e : results) {
            SpaceEvent event = new SpaceEvent();
            event.setTitle((String) e.get("name"));
            event.setDate((String) e.get("date"));
            event.setDescription((String) e.get("description"));
            Map type = (Map) e.get("type");
            event.setType(type != null ? (String) type.get("name") : "Event");
            event.setImageUrl((String) e.get("feature_image")); // <-- Add this line
            events.add(event);
        }
        return events;
    }
// ...existing code...
}