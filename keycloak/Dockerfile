FROM keycloak/keycloak:24.0
ENV KC_PROXY=edge
RUN /opt/keycloak/bin/kc.sh build --db=postgres --health-enabled=true
