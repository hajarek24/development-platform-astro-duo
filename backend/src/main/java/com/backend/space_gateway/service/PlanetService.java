package com.backend.space_gateway.service;

import com.backend.space_gateway.model.PlanetResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PlanetService {

    private static final String ALL_PLANETS_URL = "https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true";
    private static final String PLANET_DETAIL_URL = "https://api.le-systeme-solaire.net/rest/bodies/%s";

    private static final Map<String, String> PLANET_DESCRIPTIONS = Map.of(
            "mercury", "Mercury is the smallest planet and closest to the Sun.",
            "venus", "Venus is the hottest planet with a thick, toxic atmosphere.",
            "earth", "Earth is our home and the only planet known to support life.",
            "mars", "Mars is known as the Red Planet and may have once had water.",
            "jupiter", "Jupiter is the largest planet and a gas giant with a Great Red Spot.",
            "saturn", "Saturn is famous for its beautiful ring system.",
            "uranus", "Uranus is an ice giant with a blue-green color due to methane.",
            "neptune", "Neptune is a windy, blue planet farthest from the Sun."
    );

    private static final Map<String, String> PLANET_COMPOSITIONS = Map.of(
            "mercury", "Rocky (silicate rock, iron core)",
            "venus", "Rocky (silicate rock, iron core)",
            "earth", "Rocky (silicate rock, iron core, water)",
            "mars", "Rocky (silicate rock, iron core)",
            "jupiter", "Gas (hydrogen, helium)",
            "saturn", "Gas (hydrogen, helium)",
            "uranus", "Ice giant (hydrogen, helium, water, ammonia, methane)",
            "neptune", "Ice giant (hydrogen, helium, water, ammonia, methane)"
    );

    private static String normalizePlanetId(String id) {
        return switch (id.toLowerCase()) {
            case "mercure" -> "mercury";
            case "venus" -> "venus";
            case "terre" -> "earth";
            case "mars" -> "mars";
            case "jupiter" -> "jupiter";
            case "saturne" -> "saturn";
            case "uranus" -> "uranus";
            case "neptune" -> "neptune";
            default -> id.toLowerCase();
        };
    }

    private final RestTemplate restTemplate = new RestTemplate();

    public List<PlanetResponse> getAllPlanets() {
        var response = restTemplate.getForObject(ALL_PLANETS_URL, SolarSystemBodiesResponse.class);
        if (response == null || response.bodies == null) return List.of();
        return response.bodies.stream().map(PlanetService::mapToPlanetResponse).collect(Collectors.toList());
    }

    public PlanetResponse getPlanetById(String id) {
        var body = restTemplate.getForObject(String.format(PLANET_DETAIL_URL, id), SolarSystemBody.class);
        if (body == null) return null;
        return mapToPlanetResponse(body);
    }

    private static PlanetResponse mapToPlanetResponse(SolarSystemBody body) {
        PlanetResponse p = new PlanetResponse();
        String normalizedId = normalizePlanetId(body.id);
        p.setId(body.id);
        p.setName(body.englishName);
        p.setDescription(getPlanetDescription(normalizedId));
        p.setMass(body.mass != null ? body.mass.massValue * Math.pow(10, body.mass.massExponent) / 5.972e24 : 0); // Earth masses
        p.setRadius(body.meanRadius != null ? body.meanRadius / 6371 : 0); // Earth radii
        p.setSemiMajorAxis(body.semimajorAxis != null ? body.semimajorAxis / 149597870.7 : 0); // AU
        p.setOrbitalPeriod(body.sideralOrbit != null ? body.sideralOrbit : 0);
        p.setImageUrl(getPlanetImageUrl(normalizedId));
        p.setHasRings(body.aroundPlanet != null && body.aroundPlanet.rel != null && body.aroundPlanet.rel.contains("rings"));
        p.setMoonCount(body.moons != null ? body.moons.size() : 0);
        p.setType(body.bodyType);
        p.setSurfaceGravity(body.gravity != null ? body.gravity / 9.807 : 0); // Earth g
        p.setSurfaceTemperature(body.avgTemp != null ? body.avgTemp : 0); // Kelvin
        p.setComposition(PLANET_COMPOSITIONS.getOrDefault(normalizedId, ""));
        return p;
    }

    private static String getPlanetDescription(String id) {
        return PLANET_DESCRIPTIONS.getOrDefault(id.toLowerCase(), "A planet in our Solar System.");
    }

    private static String getPlanetImageUrl(String id) {
        return switch (id.toLowerCase()) {
            case "mercury" -> "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg";
            case "venus" -> "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg";
            case "earth" -> "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg";
            case "mars" -> "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg";
            case "jupiter" -> "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg";
            case "saturn" -> "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg";
            case "uranus" -> "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg";
            case "neptune" -> "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg";
            default -> ""; // fallback/placeholder
        };
    }

    // --- Helper classes for API mapping ---
    private static class SolarSystemBodiesResponse {
        public List<SolarSystemBody> bodies;
    }
    private static class SolarSystemBody {
        public String id;
        public String englishName;
        public String discoveredBy;
        public Mass mass;
        public Double meanRadius;
        public Double semimajorAxis;
        public Double sideralOrbit;
        public List<Object> moons;
        public String bodyType;
        public Double gravity;
        public Double avgTemp;
        public String composition;
        public AroundPlanet aroundPlanet;
    }
    private static class Mass {
        public Double massValue;
        public Integer massExponent;
    }
    private static class AroundPlanet {
        public String rel;
    }
}