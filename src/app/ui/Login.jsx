import React, { useState } from "react";
import { Button, Modal, Image, Form, Card, Input } from "antd";
import { UploadButton } from "@/app/ui/UploadThing";
import { redirect } from "next/navigation";
export default function Login({ open, onClose }) {
  const [form] = Form.useForm();

  const onOk = () => {
    form.validateFields().then((values) => {
      if (
        values.user === "nlongvu237@gmail.com" &&
        values.password === "chanchua123"
      ) {
        localStorage.setItem("user", values.user);
        onClose();
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onOk();
    }
  };

  return (
    <Modal title={"Đăng nhập"} open={open} onOk={onOk} onClose={onClose} on>
      <Card>
        <Form layout={"vertical"} form={form}>
          <Form.Item label="User" name="user">
            <Input placeholder="Nhập" onKeyDown={handleKeyPress} />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Nhập" onKeyDown={handleKeyPress} />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
}
