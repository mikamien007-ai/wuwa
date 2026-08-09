import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

const schema = z;

const booleanStringSchema = schema.z
  .union([schema.z.boolean(), schema.z.string(), schema.z.number()])
  .transform(value =>
    value === true || value === 'true' || value === 1 || value === '1'
      ? 'true'
      : 'false',
  )
  .prefault('false');

const sexualStateSchema = schema.z
  .object({
    'Có Đang Làm Tình Không': schema.z
      .union([schema.z.boolean(), schema.z.string()])
      .prefault(false),
    'Tiến Độ Cao Trào': schema.z.coerce
      .number()
      .transform(value => _.clamp(value, 0, 100))
      .prefault(0),
    'Số Lần Cao Trào': schema.z.coerce
      .number()
      .transform(value => _.clamp(value, 0, 999))
      .prefault(0),
    '_Giới Hạn Số Lần Cao Trào': schema.z.coerce
      .number()
      .transform(value => _.clamp(value, 1, 99))
      .prefault(5),
  })
  .prefault({});

const clothingSchema = schema.z
  .object({
    'Trang Phục Trên': schema.z.string().prefault('Chờ AI điền vào'),
    'Trang Phục Dưới': schema.z.string().prefault('Chờ AI điền vào'),
    'Phụ Kiện': schema.z.string().prefault('Chờ AI điền vào'),
    'Khác': schema.z.string().prefault('Chờ AI điền vào'),
  })
  .prefault({});

const basicInformationSchema = schema.z
  .object({
    'Tên Nhân Vật': schema.z.string().prefault(''),
    'Chiều Cao': schema.z.string().prefault('Chờ AI điền vào'),
    'Cỡ Ngực': schema.z.string().prefault('Chờ AI điền vào'),
    'Ngoại Hình': schema.z.string().prefault('Chờ AI điền vào'),
    'Có Phải Trinh Nữ': schema.z
      .union([schema.z.boolean(), schema.z.string()])
      .prefault(true),
  })
  .prefault({});

const additionalInformationSchema = schema.z
  .object({
    'Danh Hiệu Nhân Vật': schema.z.string().prefault('Chờ AI điền vào'),
    'Suy Nghĩ Nội Tâm': schema.z.string().prefault('Chờ AI điền vào'),
  })
  .prefault({});

const privateDataSchema = schema.z
  .object({
    'Số Lần Giao Hợp': schema.z.coerce
      .number()
      .transform(value => _.clamp(value, 0, 9999))
      .prefault(0),
    'Số Bạn Tình': schema.z.coerce
      .number()
      .transform(value => _.clamp(value, 0, 999))
      .prefault(0),
    'Kinh Nghiệm Tình Dục': schema.z.string().prefault('Chờ AI điền vào'),
    'Sở Thích Tình Dục': schema.z.string().prefault('Chờ AI điền vào'),
    'Dấu Vết Lâu Dài': schema.z.string().prefault('Chờ AI điền vào'),
    'Nhật Ký Tình Dục': schema.z
      .array(
        schema.z
          .object({
            'Thời Gian': schema.z.string().prefault(''),
            'Nội Dung': schema.z.string().prefault(''),
            'Kết Quả': schema.z.string().prefault(''),
          })
          .prefault({}),
      )
      .prefault([]),
  })
  .prefault({});

const closeUpSchema = schema.z
  .object({
    'Bộ Phận': schema.z.string().prefault(''),
    'Miêu Tả': schema.z.string().prefault(''),
  })
  .prefault({});

const physiologicalStateSchema = schema.z
  .object({
    'Độ Bôi Trơn Âm Đạo': schema.z.string().prefault('Chờ AI điền vào'),
    'Trạng Thái Nhũ Hoa': schema.z.string().prefault('Chờ AI điền vào'),
    'Trạng Thái Âm Vật': schema.z.string().prefault('Chờ AI điền vào'),
    'Trạng Thái Tử Cung': schema.z.string().prefault('Chờ AI điền vào'),
    'Có Mang Thai Không': schema.z
      .union([schema.z.boolean(), schema.z.string()])
      .prefault(false),
  })
  .prefault({});

const heroineSchema = schema.z
  .object({
    'Thông Tin Cơ Bản': basicInformationSchema,
    'Có Mặt Không': booleanStringSchema,
    'Vị Trí Tacet Mark': schema.z.string().prefault('Chờ AI điền vào'),
    'Trang Phục Hiện Tại': schema.z
      .union([schema.z.string(), clothingSchema])
      .transform(value => value),
    'Độ Hảo Cảm': schema.z.coerce
      .number()
      .transform(value => _.clamp(value, 0, 100))
      .prefault(0),
    'Ham Muốn Tình Dục': schema.z.coerce
      .number()
      .transform(value => _.clamp(value, 0, 100))
      .prefault(0),
    'Thông Tin Bổ Sung': additionalInformationSchema,
    'Cận Cảnh': schema.z.array(closeUpSchema).prefault([]),
    'Vật Phẩm': schema.z.string().prefault('Chờ AI điền vào'),
    'Trạng Thái Tình Dục': sexualStateSchema,
    'Trạng Thái Sinh Lý': physiologicalStateSchema,
    'Dữ Liệu Riêng Tư': privateDataSchema,
  })
  .prefault({});

const inventoryItemSchema = schema.z
  .object({
    'Số Lượng': schema.z.coerce
      .number()
      .transform(value => _.clamp(value, 0, 9999))
      .prefault(1),
    'Mô Tả': schema.z.string().prefault(''),
    'Loại': schema.z.string().prefault('Tạp Vật'),
  })
  .prefault({});

const protagonistSchema = schema.z
  .object({
    'Có Phải Là Rover Hay Không': schema.z
      .union([schema.z.boolean(), schema.z.string()])
      .prefault(true),
    'Giới Tính': schema.z.string().prefault('Nam'),
    'Thân Phận Và Thiết Lập Thêm': schema.z.string().prefault(''),
    'Trạng Thái Hiện Tại': schema.z.string().prefault(''),
    'Trang Phục Hiện Tại': schema.z
      .union([schema.z.string(), clothingSchema])
      .prefault(''),
    'Trạng Thái Tình Dục': sexualStateSchema,
    'Túi Đồ': schema.z.record(schema.z.string(), inventoryItemSchema).prefault({}),
  })
  .prefault({});

const plotTriggerSchema = schema.z
  .object({
    'Loại Sự Kiện': schema.z.string().prefault('Sự Kiện'),
    'Tóm Tắt Sự Kiện': schema.z.string().prefault(''),
    'Trạng Thái': schema.z.string().prefault('Chờ Kích Hoạt'),
    'Thời Gian Sự Kiện': schema.z.string().prefault(''),
  })
  .prefault({});

const foreshadowingSchema = schema.z
  .object({
    'Nội Dung Phục Bút': schema.z.string().prefault(''),
    'Kết Quả Dự Kiến': schema.z.string().prefault(''),
  })
  .prefault({});

const legacyContactEntrySchema = schema.z
  .record(schema.z.string(), schema.z.unknown())
  .prefault({});

const mvuSchema = schema.z
  .object({
    'Thời Gian Hiện Tại': schema.z.string().prefault(''),
    'Địa Điểm Hiện Tại': schema.z.string().prefault(''),
    'Hiển Thị Cốt Truyện': schema.z.string().prefault(''),
    'Có Phải Hậu Truyện': booleanStringSchema,
    'Mục Tiêu Dài Hạn Hiện Tại': schema.z.string().prefault(''),
    'Sự Kiện Diễn Xuất Hiện Tại': schema.z.string().prefault(''),
    'Nút Sự Kiện Diễn Xuất Hiện Tại': schema.z.string().prefault(''),
    'Nút Sự Kiện Tiếp Theo Sắp Tới': schema.z.string().prefault(''),
    'Sự Kiện Trước Đã Hoàn Thành': schema.z.string().prefault(''),
    'Nút Sự Kiện Trước Đã Hoàn Thành': schema.z.string().prefault(''),
    'Điều Kiện Kết Thúc Chương': schema.z.string().prefault(''),
    'Thông Tin Nhân Vật Chính': protagonistSchema,
    'NPC Rover': schema.z
      .object({
        'Có Tồn Tại Hay Không': schema.z
          .union([schema.z.boolean(), schema.z.string()])
          .prefault(false),
        'Giới Tính': schema.z.string().prefault('Nữ'),
      })
      .prefault({}),
    'Nữ Nhân Vật': schema.z.record(schema.z.string(), heroineSchema).prefault({}),
    contact: schema.z
      .record(schema.z.string(), legacyContactEntrySchema)
      .prefault({}),
    '_Danh Sách Nhân Vật Đã Biết': schema.z
      .union([
        schema.z.string(),
        schema.z.array(schema.z.string()),
        schema.z.record(schema.z.string(), schema.z.unknown()),
      ])
      .optional(),
    '_Hiển Thị Nữ Nhân Vật Tại Chỗ': schema.z
      .union([
        schema.z.string(),
        schema.z.array(schema.z.string()),
        schema.z.record(schema.z.string(), schema.z.unknown()),
      ])
      .optional(),
    '_Hiển Thị Nữ Nhân Vật Chế Độ Rút Gọn': schema.z
      .union([
        schema.z.string(),
        schema.z.array(schema.z.string()),
        schema.z.record(schema.z.string(), schema.z.unknown()),
      ])
      .optional(),
    '_Hiển Thị Thông Tin Nhân Vật Chính Chế Độ Rút Gọn': schema.z
      .unknown()
      .optional(),
    'Trình Kích Hoạt Cốt Truyện': schema.z.array(plotTriggerSchema).prefault([]),
    'Phục Bút': schema.z.array(foreshadowingSchema).prefault([]),
    _storyState: schema.z
      .object({
        majorVerIdx: schema.z.coerce.number().prefault(0),
        partIdx: schema.z.coerce.number().prefault(0),
        isPostScript: schema.z
          .union([schema.z.boolean(), schema.z.string()])
          .prefault(false),
        _anchorVer: schema.z.string().prefault('1.0'),
      })
      .prefault({}),
    'Chỉ Lệnh': schema.z
      .object({
        'Thúc Đẩy Cốt Truyện': schema.z.unknown().prefault(null),
        'Chuyển Phiên Bản': schema.z.unknown().prefault(null),
        'Đổi Chế Độ Hậu Truyện Thành': schema.z.unknown().prefault(null),
      })
      .prefault({}),
  })
  .prefault({});

$(() => {
  registerMvuSchema(mvuSchema);
  console.info(
    '[Minh Triều] Đã đăng ký schema Zod cho MVU (Nữ Nhân Vật / Thông Tin Nhân Vật Chính / Trình Kích Hoạt Cốt Truyện, v.v.)',
  );
});
