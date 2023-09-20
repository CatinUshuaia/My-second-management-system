
interface UploadInfo {
    file: {
        uid: string;
        status: string;
        originFileObj: File;
        response: FormImgRes;
    };
}

interface Image {
    uid: string;
    url: string;
    status:string
}

interface UploadComponentProps {
    userName: string;
    images: Image[];
    setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}