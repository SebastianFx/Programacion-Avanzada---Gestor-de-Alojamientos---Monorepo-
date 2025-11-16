package uniquindio.edu.co.Proyecto_Avanzada.configuracion.seguridad;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Filtro que intercepta cada petición HTTP para validar el token JWT
 * CORREGIDO: Ahora extrae los roles directamente del token JWT
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Obtener el header Authorization
        final String authorizationHeader = request.getHeader("Authorization");

        String email = null;
        String jwt = null;

        // 2. Verificar si el header contiene el token Bearer
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Extraer el token (quitar "Bearer ")
            try {
                email = jwtUtil.extractEmail(jwt);
            } catch (Exception e) {
                logger.error("Error al extraer email del token JWT: " + e.getMessage());
            }
        }

        // 3. Validar el token y autenticar al usuario
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Validar el token
            if (jwtUtil.validateToken(jwt)) {

                // ===== CORRECCIÓN CRÍTICA: Extraer rol del TOKEN, no de la BD =====
                String rol = null;
                try {
                    rol = jwtUtil.extractRol(jwt);
                    logger.info("🔐 JWT Filter - Email: " + email + ", Rol extraído del token: " + rol);
                } catch (Exception e) {
                    logger.error("Error al extraer rol del token: " + e.getMessage());
                }

                // Crear las authorities basadas en el rol del TOKEN
                List<GrantedAuthority> authorities = new ArrayList<>();
                if (rol != null && !rol.isEmpty()) {
                    // Añadir el prefijo ROLE_ si no lo tiene
                    String rolWithPrefix = rol.startsWith("ROLE_") ? rol : "ROLE_" + rol;
                    authorities.add(new SimpleGrantedAuthority(rolWithPrefix));
                    logger.info("✅ JWT Filter - Authority asignada: " + rolWithPrefix);
                } else {
                    // Si no hay rol en el token, asignar ROLE_USUARIO por defecto
                    authorities.add(new SimpleGrantedAuthority("ROLE_USUARIO"));
                    logger.warn("⚠️ JWT Filter - No se encontró rol en el token, asignando ROLE_USUARIO por defecto");
                }

                // Crear un UserDetails simple con el email y las authorities del token
                UserDetails userDetails = User.builder()
                        .username(email)
                        .password("") // No necesitamos la contraseña aquí
                        .authorities(authorities)
                        .build();

                // Crear el objeto de autenticación
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                authorities  // Usar las authorities del TOKEN
                        );

                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // Establecer la autenticación en el contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                logger.info("🎯 JWT Filter - Autenticación establecida para: " + email + " con authorities: " + authorities);
            } else {
                logger.warn("❌ JWT Filter - Token inválido para email: " + email);
            }
        }

        // 4. Continuar con la cadena de filtros
        filterChain.doFilter(request, response);
    }
}
