import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Typography,
  Divider
} from "antd";

const { Option } = Select;
const { Title, Text } = Typography;

const AddSectionModal = ({ open, onCancel, onSubmit, mode = 'add', initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues && (mode === 'edit' || mode === 'view')) {
      form.setFieldsValue(initialValues);
    } else if (!open) {
      form.resetFields();
    }
  }, [open, initialValues, mode, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isAddMode = mode === 'add';

  const modalTitle = isAddMode ? 'Add New Section' : isEditMode ? 'Edit Section' : 'View Section';
  const buttonText = isAddMode ? 'Add Section' : 'Update Section';

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={650}
      className="custom-modal"
      styles={{
        body: {
          padding: "4px 2px",
          borderRadius: 16
        }
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 10 }}>
        <Title level={4} style={{ marginBottom: 0 }}>
          {modalTitle}
        </Title>
        <Text type="secondary">
          {isAddMode ? 'Create and manage class sections efficiently' : isEditMode ? 'Update section details' : 'View section information'}
        </Text>
      </div>

      <Divider />

      {/* Form */}
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Section Name"
              name="sectionName"
              rules={[{ required: true, message: "Enter section name" }]}
            >
              <Input
                placeholder="e.g. A"
                size="large"
                style={{ borderRadius: 8 }}
                disabled={isViewMode}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Class"
              name="className"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select class"
                size="large"
                style={{ borderRadius: 8 }}
                disabled={isViewMode}
              >
                <Option value="FY BCA">FY BCA</Option>
                <Option value="SY BCA">SY BCA</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Student Count"
              name="students"
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                placeholder="Enter student count"
                size="large"
                style={{ borderRadius: 8 }}
                disabled={isViewMode}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Capacity (%)"
              name="capacity"
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                placeholder="Enter capacity"
                size="large"
                style={{ borderRadius: 8 }}
                disabled={isViewMode}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Coordinator"
          name="teacher"
          rules={[{ required: true }]}
        >
          <Input
            placeholder="Enter coordinator name"
            size="large"
            style={{ borderRadius: 8 }}
            disabled={isViewMode}
          />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select
            placeholder="Select status"
            size="large"
            style={{ borderRadius: 8 }}
            disabled={isViewMode}
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>

        {/* Footer Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
            gap: 10
          }}
        >
          <Button
            onClick={onCancel}
            size="large"
            style={{
              borderRadius: 8,
              padding: "0 20px"
            }}
          >
            {isViewMode ? 'Close' : 'Cancel'}
          </Button>

          {!isViewMode && (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                borderRadius: 8,
                padding: "0 20px",
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                border: "none"
              }}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default AddSectionModal;