package com.mkl.bv_demo;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Msg implements Serializable {
    private String name;
    private int code;
    private boolean success;
    private Map<String, Object> extend = new HashMap<> ();

    public Msg (String name, int code) {
        this.name = name;
        this.code = code;
    }

    public Msg (String name, int code, boolean success) {
        this.name = name;
        this.code = code;
        this.success = success;
    }

    public Msg () {

    }

    public static Msg success () {
        return new Msg ("成功", 200, true);
    }

    public static Msg fail () {
        return new Msg ("失败", 500, false);
    }

    public Msg add (String key, Object value) {
        this.extend.put (key, value);
        return this;
    }

    public String getName () {
        return name;
    }

    public void setName (String name) {
        this.name = name;
    }

    public int getCode () {
        return code;
    }

    public void setCode (int code) {
        this.code = code;
    }

    public Map<String, Object> getExtend () {
        return extend;
    }

    public void setExtend (Map<String, Object> extend) {
        this.extend = extend;
    }

    public boolean isSuccess () {
        return success;
    }

    public void setSuccess (boolean success) {
        this.success = success;
    }

}