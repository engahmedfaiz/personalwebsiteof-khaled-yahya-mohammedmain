// import { createUploadthing, type FileRouter } from "uploadthing/next";

// const f = createUploadthing();

// export const ourFileRouter = {
//   articleImage: f({
//     image: {
//       maxFileSize: "4MB",
//       maxFileCount: 1,
//     },
//   })
//     .middleware(async () => {
//       // يمكنك إضافة التحقق من الصلاحيات هنا لاحقاً
//       // حالياً نسمح للجميع بالرفع للتجربة
//       return { userId: "temp-user" };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       console.log("تم رفع الصورة بنجاح:", file.url);
//       return { uploadedBy: metadata.userId };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { auth } from "@/lib/auth"; // لو تستعمل auth

const f = createUploadthing();

export const ourFileRouter = {
  articleImage: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("File uploaded:", file.url);
      return { url: file.url };
    }),
    teamImage: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("File uploaded:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
