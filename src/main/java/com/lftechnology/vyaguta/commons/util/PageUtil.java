package com.lftechnology.vyaguta.commons.util;

import com.lftechnology.vyaguta.commons.pojo.Page;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public class PageUtil {
    public static Page page(Integer pageNum, Integer offset) {
        pageNum = pageNum == null ? 1 : pageNum;
        Integer pageSize = Page.PAGE_SIZE;
        Integer start = (pageNum - 1) * pageSize;
        offset = offset == null ? Page.PAGE_SIZE : offset;

        return new Page(pageNum, start, offset);
    }
}
