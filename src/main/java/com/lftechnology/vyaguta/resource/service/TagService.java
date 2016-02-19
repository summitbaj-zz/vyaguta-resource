package com.lftechnology.vyaguta.resource.service;

import java.util.List;

import com.lftechnology.vyaguta.commons.service.CrudService;
import com.lftechnology.vyaguta.resource.entity.Tag;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public interface TagService extends CrudService<Tag, String> {

  List<Tag> findByTitle(String title);
}
