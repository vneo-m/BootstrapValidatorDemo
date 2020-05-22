package com.mkl.bv_demo.controller;

import com.mkl.bv_demo.Msg;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author mkl
 * @date 2020/02/12
 **/
@Controller
public class DataCheckController {

    @GetMapping("/")
    public String index () {
        return "index";
    }

    @ResponseBody
    @PostMapping("/checkPhoneNum")
    public Map<String, Boolean> checkPhoneNum (String mobilePhone) {
        Map<String, Boolean> map = new HashMap<String, Boolean>();
        List<String> userlist = new ArrayList<>();
        userlist.add("15326854562");
        userlist.add("12534258795");
        if (userlist.contains(mobilePhone)) {
            map.put("valid", false);
        } else {
            map.put("valid", true);
        }
        return map;
    }

    @ResponseBody
    @PostMapping("/checkUsername")
    public Map<String, Boolean> checkUsername (String userName) {
        Map<String, Boolean> map = new HashMap<String, Boolean> ();
        List<String> userlist = new ArrayList<> ();
        userlist.add("mkl");
        userlist.add("mnb");
        if (userlist.contains (userName)) {
            map.put ("valid", false);
        } else {
            map.put ("valid", true);
        }
        return map;
    }

    @ResponseBody
    @PostMapping("/confirmUserReg")
    public Msg confirmUserReg () {
        return Msg.success ().add ("SUCCESS", "注册成功!");
    }
}
