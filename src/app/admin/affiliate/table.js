"use client";
import {
  Card,
  Table,
  Row,
  Col,
  Button,
  notification,
  Image,
  Space,
  Modal,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ModalCreateAndUpdate from "@/app/ui/ModalCreateAndUpdate";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { supabase } from "@/app/api/supabase/connect";

export default function page({}) {
  const openNotificationWithIcon = (type, description) => {
    notification[type]({
      message: "Hệ thống",
      description: description,
    });
  };
  let isLogin = false;
  if (typeof window !== "undefined") {
    isLogin = localStorage.getItem("user");
  }
  if (!isLogin) {
    redirect("/admin");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [dataTable, setDataTable] = useState([]);

  const onOpen = (record) => {
    setIsModalOpen(true);
    setCurrentData(record);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setCurrentData(null);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data, error } = await supabase.from("affiliate").select();
    if (error) {
      console.log(error);
    }
    setDataTable(data.sort((a, b) => a.order - b.order));
  };

  const createData = async (value) => {
    const { title, order, image, url, content } = value;
    const { data, error } = await supabase.from("affiliate").insert([
      {
        title,
        order,
        image,
        url,
        content,
      },
    ]);

    if (error) {
      openNotificationWithIcon("error", error);
    } else {
      openNotificationWithIcon("success", "Tạo thành công");
      getData();
    }

    // setDataTable(data);
  };
  const updateData = async (value) => {
    const { title, order, image, url, content, id } = value;
    const { data, error } = await supabase
      .from("affiliate")
      .update([
        {
          title,
          order,
          image,
          url,
          content,
        },
      ])
      .eq("id", id);

    if (error) {
      openNotificationWithIcon("error", error);
    } else {
      openNotificationWithIcon("success", "Cập nhật thành công");
      getData();
    }
  };
  const deleteData = async (id) => {
    const { data, error } = await supabase
      .from("affiliate")
      .delete()
      .eq("id", id);

    if (error) {
      openNotificationWithIcon("error", error);
    } else {
      openNotificationWithIcon("success", "Xoá thành công");
      getData();
    }
  };

  const showConfirmDelete = (id) => {
    Modal.confirm({
      title: "Xoá link",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteData(id);
      },
    });
  };

  console.log(dataTable);

  const columns = [
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} width={80} height={80} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (text, record) => (
        <Space>
          <EditOutlined
            style={{ color: "blue", cursor: "pointer", fontSize: 18 }}
            onClick={() => {
              onOpen(record);
            }}
          />
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer", fontSize: 18 }}
            onClick={() => {
              showConfirmDelete(record?.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card title="Affiliate">
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Button icon={<PlusCircleOutlined />} onClick={onOpen}>
            Thêm link
          </Button>
        </Col>
        <Col span={24}>
          <Table dataSource={dataTable} columns={columns} />
        </Col>
      </Row>
      <ModalCreateAndUpdate
        onClose={onClose}
        open={isModalOpen}
        createData={createData}
        updateData={updateData}
        currentData={currentData}
      />
    </Card>
  );
}
