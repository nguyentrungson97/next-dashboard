import { Button, Modal, Image, Form, Card, Input } from "antd";
import { UploadButton } from "@/app/ui/UploadThing";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";

export default function ModalCreateAndUpdate({
  open,
  onClose,
  currentData,
  createData,
  updateData,
}) {
  const [form] = Form.useForm();
  const [value, setValue] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const onOk = () => {
    form.validateFields().then((values) => {
      values.image = imageUpload;
      values.content = value;
      if (currentData?.id) {
        values.id = currentData.id;
        updateData(values);
        onClose();
        form.resetFields();
      } else {
        createData(values);
        onClose();
        form.resetFields();
      }
    });
  };

  useEffect(() => {
    if (!currentData) return;
    const { title, order, image, url, content } = currentData;
    form.setFieldsValue({
      title,
      order,
      image,
      url,
      content,
    });
    setImageUpload(image);
    setValue(content);
  }, [currentData]);

  return (
    <Modal
      title={currentData?.id ? "Cập nhật" : "Thêm mới"}
      open={open}
      onOk={onOk}
      onCancel={onClose}
    >
      <Card>
        <Form layout={"vertical"} form={form}>
          <Form.Item label="Tên" name="title">
            <Input placeholder="Nhập" />
          </Form.Item>
          <Form.Item label="STT" name="order">
            <Input placeholder="Nhập" />
          </Form.Item>
          <Form.Item label="URL" name="url">
            <Input placeholder="Nhập" />
          </Form.Item>
          <Form.Item label="Nội dung" name="content">
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </Form.Item>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res?.[0]?.url);
              setImageUpload(res?.[0]?.url);
            }}
            onUploadError={(error) => {
              // Do something with the error.
            }}
          />
          <Form.Item label="Ảnh" name="image">
            {imageUpload && <Image src={imageUpload} />}
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
}
