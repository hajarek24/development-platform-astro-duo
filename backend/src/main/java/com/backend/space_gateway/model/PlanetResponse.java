package com.backend.space_gateway.model;

import lombok.Data;

@Data
public class PlanetResponse {
    private String id;
    private String name;
    private String description;
    private double mass; // in Earth masses
    private double radius; // in Earth radii
    private double semiMajorAxis; // in AU
    private double orbitalPeriod; // in days
    private String imageUrl;
    private boolean hasRings;
    private int moonCount;
    private String type; // terrestrial, gas giant, ice giant, dwarf
    private double surfaceGravity; // in Earth g
    private double surfaceTemperature; // in Kelvin
    private String composition; // Main composition elements
}
