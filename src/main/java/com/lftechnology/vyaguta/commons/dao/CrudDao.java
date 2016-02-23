package com.lftechnology.vyaguta.commons.dao;

import java.util.List;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 * 
 * @author anishmanandhar<anishmanandhar@lftechnology.com>
 *
 */
public interface CrudDao<T, Pk> {

    public T save(T entity);

    public T update(T entity);

    public void remove(T entity);

    public T findById(Pk id);

    public List<T> findAll();

    public Long count();

    public List<T> find(Integer start, Integer offset);
}