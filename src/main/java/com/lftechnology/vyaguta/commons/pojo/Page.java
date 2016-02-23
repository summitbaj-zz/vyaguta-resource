package com.lftechnology.vyaguta.commons.pojo;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public class Page {

    public static final Integer PAGE_SIZE = 20;

    private Integer start;
    private Integer offset;
    private Integer pageNum;

    public Page(Integer pageNum, Integer start, Integer offset) {
        this.pageNum = pageNum;
        this.start = start;
        this.offset = offset;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

}
