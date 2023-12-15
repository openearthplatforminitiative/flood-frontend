FROM quay.io/keycloak/keycloak:22.0.0

# Create the themes directory
RUN mkdir -p /opt/keycloak/themes/custom-keycloak-theme

# Copy the custom theme into the themes directory
COPY ../../custom-keycloak-theme/ /opt/keycloak/themes/custom-keycloak-theme

