package com.lftechnology.vyaguta.commons.jpautil;

import java.util.UUID;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public class GuidUtil {

    public static String generate() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
