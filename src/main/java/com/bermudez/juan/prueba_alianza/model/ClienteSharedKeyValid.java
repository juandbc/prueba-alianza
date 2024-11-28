package com.bermudez.juan.prueba_alianza.model;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;

import com.bermudez.juan.prueba_alianza.service.ClienteService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Map;
import org.springframework.web.servlet.HandlerMapping;


/**
 * Check that sharedKey is present and available when a new Cliente is created.
 */
@Target({ FIELD, METHOD, ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(
        validatedBy = ClienteSharedKeyValid.ClienteSharedKeyValidValidator.class
)
public @interface ClienteSharedKeyValid {

    String message() default "";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    class ClienteSharedKeyValidValidator implements ConstraintValidator<ClienteSharedKeyValid, String> {

        private final ClienteService clienteService;
        private final HttpServletRequest request;

        public ClienteSharedKeyValidValidator(final ClienteService clienteService,
                final HttpServletRequest request) {
            this.clienteService = clienteService;
            this.request = request;
        }

        @Override
        public boolean isValid(final String value, final ConstraintValidatorContext cvContext) {
            @SuppressWarnings("unchecked") final Map<String, String> pathVariables =
                    ((Map<String, String>)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE));
            final String currentId = pathVariables.get("sharedKey");
            if (currentId != null) {
                // only relevant for new objects
                return true;
            }
            String error = null;
            if (value == null) {
                // missing input
                error = "NotNull";
            } else if (clienteService.sharedKeyExists(value)) {
                error = "Exists.cliente.sharedKey";
            }
            if (error != null) {
                cvContext.disableDefaultConstraintViolation();
                cvContext.buildConstraintViolationWithTemplate("{" + error + "}")
                        .addConstraintViolation();
                return false;
            }
            return true;
        }

    }

}
