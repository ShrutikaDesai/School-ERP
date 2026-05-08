import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Divider,
  Button
} from "antd";

const { Title, Text } = Typography;

const AddClassModal = ({
  open,
  onClose,
  mode,
  initialValues,
  onSubmit
}) => {
  const [form] = Form.useForm();

  const isView = mode === "view";
  const isEdit = mode === "edit";

  const modalTitle =
    mode === "add"
      ? "Add New Class"
      : mode === "edit"
      ? "Edit Class"
      : "View Class";

  useEffect(() => {
    if (!open) {
      form.resetFields();
      return;
    }

    form.setFieldsValue({
      className: initialValues?.className ?? "",
      teacher: initialValues?.teacher ?? "",
      sections: initialValues?.sections ?? [],
      students: initialValues?.students ?? ""
    });
  }, [form, initialValues, open]);

  const handleOk = async () => {
    if (isView) {
      onClose();
      return;
    }

    const values = await form.validateFields();
    onSubmit?.(values);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      className="custom-modal"
    >
      {/* HEADER */}
      <div style={{ marginBottom: 10 }}>
        <Title level={4} style={{ marginBottom: 0 }}>
          {modalTitle}
        </Title>
        <Text type="secondary">
          Manage class details and structure
        </Text>
      </div>

      <Divider />

      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Class Name"
              name="className"
              rules={[{ required: true, message: "Please enter class name" }]}
            >
              <Input
                disabled={isView}
                size="large"
                placeholder="e.g. 7th Standard"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Coordinator"
              name="teacher"
              rules={[{ required: true, message: "Enter coordinator name" }]}
            >
              <Input
                disabled={isView}
                size="large"
                placeholder="Enter teacher name"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Sections"
              name="sections"
              rules={[{ required: true, message: "Select sections" }]}
            >
              <Select
                mode="multiple"
                disabled={isView}
                size="large"
                placeholder="Select sections"
                style={{ borderRadius: 8 }}
                options={[
                  { label: "A", value: "A" },
                  { label: "B", value: "B" },
                  { label: "C", value: "C" },
                  { label: "D", value: "D" }
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Student Count"
              name="students"
              rules={[{ required: true, message: "Enter student count" }]}
            >
              <Input
                disabled={isView}
                type="number"
                size="large"
                placeholder="Enter students"
                style={{ borderRadius: 8 }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* FOOTER BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
            gap: 10
          }}
        >
          {!isView && (
            <Button
              onClick={onClose}
              size="large"
              style={{ borderRadius: 8 }}
            >
              Cancel
            </Button>
          )}

          <Button
            type="primary"
            size="large"
            onClick={handleOk}
            style={{
              borderRadius: 8,
              background: isView
                ? "#d9d9d9"
                : "linear-gradient(45deg, #1976d2, #42a5f5)",
              border: "none",
              padding: "0 24px"
            }}
          >
            {isView ? "Close" : isEdit ? "Update" : "Add"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddClassModal;