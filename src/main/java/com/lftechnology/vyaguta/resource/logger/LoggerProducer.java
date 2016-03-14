package com.lftechnology.vyaguta.resource.logger;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author Krishna Timilsina <krishnatimilsina@lftechnology.com>
 */
public class LoggerProducer {

    /**
     * @param injectionPoint
     * @return logger
     */

    @Produces
    public Logger loggerProducer(InjectionPoint ip) {
        return LoggerFactory.getLogger(ip.getMember().getDeclaringClass().getName());
    }

}
