package com.lftechnology.vyaguta.commons.jpautil;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.lftechnology.vyaguta.commons.pojo.User;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
@Converter(autoApply = true)
public class UserConverter implements AttributeConverter<User, String> {

    public String convertToDatabaseColumn(User user) {
        return user == null ? null : user.getId();
    }

    public User convertToEntityAttribute(String str) {
        User user = new User();
        user.setId(str);
        return user;
    }

}
