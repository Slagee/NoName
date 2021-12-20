import { InboxOutlined } from "@ant-design/icons/lib/icons";
import { Row } from "antd";
import Dragger from "antd/lib/upload/Dragger";

export default function AddDocument() {
    function actionUpload() {
        console.log("bleh");
    }
    
    const props = {
        name: "file",
        multiple: true,
        accept: ".pdf",
        showUploadList: false,
        action: actionUpload()
    }
    return (
        <div>
            <Row>

            </Row>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Klikněte nebo přetáhněte dokument sem pro nahrání</p>
            </Dragger>
        </div>
        
    )
}