package com.lftechnology.vyaguta.resource.service;

import java.util.List;
import java.util.UUID;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.HttpHeaders;

import com.lftechnology.vyaguta.commons.SecurityRequestContext;
import com.lftechnology.vyaguta.commons.pojo.ResponseData;
import com.lftechnology.vyaguta.commons.util.ArrayUtil;
import com.lftechnology.vyaguta.resource.config.Configuration;
import com.lftechnology.vyaguta.resource.pojo.Employee;

import rx.Observable;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public interface EmployeeService {

    public List<Employee> fetchEmployees(List<UUID> employeeIds);

    public List<Employee> fetchActiveEmployeesUnderProjectResource();

    default public Observable<List<Employee>> fetchEmployeeInReactiveWay(List<UUID> employeeIds) {
        Client client = ClientBuilder.newClient();
        String coreUrl = Configuration.instance().getVyagutaCoreUrl() + "employees?id=" + ArrayUtil.toCommaSeparated(employeeIds);
        WebTarget target = client.target(coreUrl);
        String token = SecurityRequestContext.getAccessToken();

        return Observable.create((Observable.OnSubscribe<List<Employee>>) subscriber -> {
            subscriber.onNext(
                    target.request().header(HttpHeaders.AUTHORIZATION, "Bearer " + token).get(new GenericType<ResponseData<Employee>>() {
            }).getData());
            subscriber.onCompleted();
        });
    }
}
