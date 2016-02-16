package com.lftechnology.vyaguta.commons.util;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

/**
 * 
 * @author anish<anishmanandhar@lftechnology.com>
 *
 */
public class ConstraintsValidator<T> {

    private static final ValidatorFactory VALIDATOR_FACTORY = Validation.buildDefaultValidatorFactory();

    private static Validator getValidator() {
        return VALIDATOR_FACTORY.getValidator();
    }

    /**
     * Validates {@link ConstraintViolation} for type <code>T</code>
     * 
     * Get the error message on the each properties of type <code>T</code>
     * 
     * @param t
     * @return List of error message if validation fails else returns null.
     * 
     */
    public List<String> validate(T t) {
        Set<ConstraintViolation<T>> constraintViolations = getValidator().validate(t);
        List<String> errorMessages = new ArrayList<String>();
        if (constraintViolations.size() >= 1) {
            Iterator<ConstraintViolation<T>> iterator = constraintViolations.iterator();
            while (iterator.hasNext()) {
                errorMessages.add(iterator.next().getMessage());
            }
        }
        return errorMessages;
    }

}
