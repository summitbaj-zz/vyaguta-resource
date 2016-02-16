package com.lftechnology.vyaguta.commons.service;

import java.util.List;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 * 
 * @author anish
 *
 */
public interface CrudService<T, Pk> {

    public T save(T entity);

    public T update(T entity);
    
    public T merge(Pk id, T entity);

    public void remove(T entity);

    public T findById(Pk id);

    public List<T> findAll();

    public Long count();

    public List<T> find(Integer start, Integer offset);

}
