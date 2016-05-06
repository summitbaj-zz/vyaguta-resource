package com.lftechnology.vyaguta.resource;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.ScheduleExpression;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.ejb.Timeout;
import javax.ejb.Timer;
import javax.ejb.TimerService;
import javax.inject.Inject;

import com.lftechnology.vyaguta.commons.exception.ParameterFormatException;
import com.lftechnology.vyaguta.resource.config.Configuration;
import com.lftechnology.vyaguta.resource.service.ProjectNotificationService;
import com.lftechnology.vyaguta.resource.service.impl.ProjectNotificationServiceImpl;

/**
 * Class that schedule notification task on
 * {@link ProjectNotificationServiceImpl}
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
@LocalBean
@Singleton
@Startup
public class TaskScheduler {

    private static final Integer HOUR = Configuration.instance().getSendEmailAtHour();
    private static final Integer MINUTE = Configuration.instance().getSendEmailAtMinute();

    @Inject
    private ProjectNotificationService projectNotificationService;

    @Resource
    TimerService timerService;

    @PostConstruct
    public void init() {
        if (HOUR == null || MINUTE == null) {
            throw new ParameterFormatException("Set valid time for notification");
        }
        timerService.createCalendarTimer(new ScheduleExpression().month("*").dayOfWeek("*").hour(HOUR).minute(MINUTE));

    }

    @Timeout
    public void runTask(Timer timer) {
        projectNotificationService.pushNotification();
    }

    public void cancelMyTimer() {
        for (Object obj : timerService.getAllTimers()) {
            Timer timer = (Timer) obj;
            timer.cancel();
        }

    }

}
