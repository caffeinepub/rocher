import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ImageIcon,
  Loader2,
  Lock,
  LogOut,
  Pencil,
  Plus,
  ShieldAlert,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend";
import { Category } from "../backend";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useStorageClient } from "../hooks/useStorageClient";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface ProductFormData {
  id: string;
  name: string;
  description: string;
  price: string;
  category: Category;
  sizes: string[];
  colors: string;
  imageKey: string;
  isNewArrival: boolean;
  isFeatured: boolean;
}

const defaultForm: ProductFormData = {
  id: "",
  name: "",
  description: "",
  price: "",
  category: Category.mens,
  sizes: [],
  colors: "",
  imageKey: "",
  isNewArrival: false,
  isFeatured: false,
};

function productToForm(p: Product): ProductFormData {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    price: (Number(p.price) / 100).toFixed(2),
    category: p.category,
    sizes: p.sizes,
    colors: p.colors.join(", "),
    imageKey: p.imageKey,
    isNewArrival: p.isNewArrival,
    isFeatured: p.isFeatured,
  };
}

function formToProduct(f: ProductFormData): Product {
  return {
    id: f.id.trim(),
    name: f.name.trim(),
    description: f.description.trim(),
    price: BigInt(Math.round(Number.parseFloat(f.price) * 100)),
    category: f.category,
    sizes: f.sizes,
    colors: f.colors
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean),
    imageKey: f.imageKey.trim(),
    isNewArrival: f.isNewArrival,
    isFeatured: f.isFeatured,
  };
}

function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const { getStorageClient } = useStorageClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const hasUploadedImage = value.startsWith("http");
  const displayImage = previewUrl ?? (hasUploadedImage ? value : null);

  const handleFile = async (file: File) => {
    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setUploading(true);
    setProgress(0);

    try {
      const storageClient = await getStorageClient();
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await storageClient.putFile(bytes, (pct) => {
        setProgress(pct);
      });
      const directUrl = await storageClient.getDirectURL(hash);
      onChange(directUrl);
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const clearImage = () => {
    setPreviewUrl(null);
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
        data-ocid="product.upload_button"
      />

      {displayImage ? (
        <div className="relative group rounded-lg overflow-hidden border border-white/10 aspect-[3/2]">
          <img
            src={displayImage}
            alt="Product preview"
            className="w-full h-full object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 p-4">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
              <Progress value={progress} className="w-full h-1 bg-white/20" />
              <span className="text-white/70 text-xs">
                Uploading... {progress}%
              </span>
            </div>
          )}
          {!uploading && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <Button
                type="button"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white text-black hover:bg-white/90 gap-1.5 text-xs"
              >
                <Upload className="h-3.5 w-3.5" />
                Replace
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={clearImage}
                className="text-white hover:bg-white/20 gap-1.5 text-xs"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </Button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          data-ocid="product.dropzone"
          className="w-full border border-dashed border-white/20 rounded-lg aspect-[3/2] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-white/40 hover:bg-white/5 transition-colors"
        >
          {uploading ? (
            <>
              <Loader2 className="h-7 w-7 animate-spin text-white/50" />
              <div className="w-1/2">
                <Progress value={progress} className="h-1 bg-white/20" />
              </div>
              <span className="text-white/50 text-xs">
                Uploading... {progress}%
              </span>
            </>
          ) : (
            <>
              <ImageIcon className="h-7 w-7 text-white/30" />
              <div className="text-center">
                <p className="text-white/50 text-sm">
                  Drop image or click to upload
                </p>
                <p className="text-white/30 text-xs mt-0.5">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </div>
            </>
          )}
        </button>
      )}
    </div>
  );
}

function ProductFormModal({
  open,
  onOpenChange,
  editProduct,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editProduct: Product | null;
}) {
  const { actor } = useActor();
  const qc = useQueryClient();
  const [form, setForm] = useState<ProductFormData>(
    editProduct ? productToForm(editProduct) : defaultForm,
  );

  // Reset when modal opens with new data
  const [lastEdit, setLastEdit] = useState<Product | null>(null);
  if (editProduct !== lastEdit) {
    setLastEdit(editProduct);
    setForm(editProduct ? productToForm(editProduct) : defaultForm);
  }

  const isEditing = !!editProduct;

  const mutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      if (!actor) throw new Error("No actor");
      const product = formToProduct(data);
      if (isEditing) {
        await actor.updateProduct(product);
      } else {
        await actor.addProduct(product);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminProducts"] });
      qc.invalidateQueries({ queryKey: ["allProducts"] });
      toast.success(isEditing ? "Product updated" : "Product added");
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Failed to save product");
    },
  });

  const set = (field: keyof ProductFormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleSize = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111] border-white/10 text-white"
        data-ocid="product.modal"
      >
        <DialogHeader>
          <DialogTitle className="text-white font-display tracking-rocher text-lg">
            {isEditing ? "EDIT PRODUCT" : "ADD PRODUCT"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="space-y-1">
            <Label className="text-white/60 text-xs uppercase tracking-wider">
              ID
            </Label>
            <Input
              data-ocid="product.input"
              value={form.id}
              onChange={(e) => set("id", e.target.value)}
              disabled={isEditing}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              placeholder="product-id"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-white/60 text-xs uppercase tracking-wider">
              Name
            </Label>
            <Input
              data-ocid="product.input"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              placeholder="Product name"
            />
          </div>
          <div className="col-span-2 space-y-1">
            <Label className="text-white/60 text-xs uppercase tracking-wider">
              Description
            </Label>
            <Textarea
              data-ocid="product.textarea"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
              rows={3}
              placeholder="Product description"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-white/60 text-xs uppercase tracking-wider">
              Price ($)
            </Label>
            <Input
              data-ocid="product.input"
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              placeholder="49.99"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-white/60 text-xs uppercase tracking-wider">
              Category
            </Label>
            <Select
              value={form.category}
              onValueChange={(v) => set("category", v as Category)}
            >
              <SelectTrigger
                data-ocid="product.select"
                className="bg-white/5 border-white/10 text-white"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/10">
                <SelectItem
                  value={Category.mens}
                  className="text-white focus:bg-white/10"
                >
                  Men's
                </SelectItem>
                <SelectItem
                  value={Category.womens}
                  className="text-white focus:bg-white/10"
                >
                  Women's
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 space-y-1">
            <Label className="text-white/60 text-xs uppercase tracking-wider">
              Product Image
            </Label>
            <ImageUploader
              value={form.imageKey}
              onChange={(url) => set("imageKey", url)}
            />
          </div>
          <div className="col-span-2 space-y-1">
            <Label className="text-white/60 text-xs uppercase tracking-wider">
              Colors (comma-separated)
            </Label>
            <Input
              data-ocid="product.input"
              value={form.colors}
              onChange={(e) => set("colors", e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              placeholder="Black, White, Gray"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label className="text-white/60 text-xs uppercase tracking-wider">
              Sizes
            </Label>
            <div className="flex gap-3 flex-wrap">
              {SIZES.map((size) => (
                <label
                  key={size}
                  htmlFor={`size-${size}`}
                  className="flex items-center gap-1.5 cursor-pointer"
                >
                  <Checkbox
                    id={`size-${size}`}
                    data-ocid="product.checkbox"
                    checked={form.sizes.includes(size)}
                    onCheckedChange={() => toggleSize(size)}
                    className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
                  />
                  <span className="text-white/80 text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              data-ocid="product.switch"
              checked={form.isNewArrival}
              onCheckedChange={(v) => set("isNewArrival", v)}
            />
            <Label className="text-white/80">New Arrival</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              data-ocid="product.switch"
              checked={form.isFeatured}
              onCheckedChange={(v) => set("isFeatured", v)}
            />
            <Label className="text-white/80">Featured</Label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            data-ocid="product.cancel_button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            data-ocid="product.submit_button"
            onClick={() => mutation.mutate(form)}
            disabled={mutation.isPending}
            className="bg-white text-black hover:bg-white/90"
          >
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isEditing ? "Save Changes" : "Add Product"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AdminPanel() {
  const { clear } = useInternetIdentity();
  const { actor } = useActor();
  const qc = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["adminProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteProduct(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminProducts"] });
      qc.invalidateQueries({ queryKey: ["allProducts"] });
      toast.success("Product deleted");
      setDeleteTarget(null);
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  const openAdd = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-display tracking-rocher text-xl font-semibold">
            ROCHER ADMIN
          </h1>
          <p className="text-white/40 text-xs mt-0.5 tracking-wider">
            PRODUCT MANAGEMENT
          </p>
        </div>
        <Button
          data-ocid="admin.secondary_button"
          variant="ghost"
          onClick={clear}
          className="text-white/60 hover:text-white hover:bg-white/10 gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-white/40 text-sm">
              {products.length} item{products.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            data-ocid="admin.primary_button"
            onClick={openAdd}
            className="bg-white text-black hover:bg-white/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div
            data-ocid="admin.loading_state"
            className="flex items-center justify-center py-24 text-white/40"
          >
            <Loader2 className="h-6 w-6 animate-spin mr-3" />
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            className="flex flex-col items-center justify-center py-24 text-white/40"
          >
            <p className="text-lg">No products yet</p>
            <p className="text-sm mt-1">
              Add your first product to get started
            </p>
          </div>
        ) : (
          <div
            data-ocid="admin.table"
            className="rounded-lg border border-white/10 overflow-hidden"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/50 text-xs uppercase tracking-wider">
                    Image
                  </TableHead>
                  <TableHead className="text-white/50 text-xs uppercase tracking-wider">
                    Name
                  </TableHead>
                  <TableHead className="text-white/50 text-xs uppercase tracking-wider">
                    Category
                  </TableHead>
                  <TableHead className="text-white/50 text-xs uppercase tracking-wider">
                    Price
                  </TableHead>
                  <TableHead className="text-white/50 text-xs uppercase tracking-wider">
                    Sizes
                  </TableHead>
                  <TableHead className="text-white/50 text-xs uppercase tracking-wider">
                    New
                  </TableHead>
                  <TableHead className="text-white/50 text-xs uppercase tracking-wider">
                    Featured
                  </TableHead>
                  <TableHead className="text-white/50 text-xs uppercase tracking-wider text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, i) => (
                  <TableRow
                    key={product.id}
                    data-ocid={`admin.item.${i + 1}`}
                    className="border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <TableCell>
                      <div className="w-10 h-10 rounded overflow-hidden bg-white/5 flex items-center justify-center">
                        {product.imageKey.startsWith("http") ? (
                          <img
                            src={product.imageKey}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-4 w-4 text-white/20" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-white/40 text-xs mt-0.5 line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-white/20 text-white/70 text-xs capitalize"
                      >
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white font-mono">
                      ${(Number(product.price) / 100).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-white/60 text-sm">
                      {product.sizes.join(", ")}
                    </TableCell>
                    <TableCell>
                      {product.isNewArrival ? (
                        <Badge className="bg-white/10 text-white text-xs">
                          Yes
                        </Badge>
                      ) : (
                        <span className="text-white/30 text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.isFeatured ? (
                        <Badge className="bg-white/10 text-white text-xs">
                          Yes
                        </Badge>
                      ) : (
                        <span className="text-white/30 text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          data-ocid={`admin.edit_button.${i + 1}`}
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(product)}
                          className="text-white/50 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          data-ocid={`admin.delete_button.${i + 1}`}
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteTarget(product)}
                          className="text-white/50 hover:text-red-400 hover:bg-red-400/10 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Product Form Modal */}
      <ProductFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        editProduct={editProduct}
      />

      {/* Delete Confirm Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent
          data-ocid="admin.dialog"
          className="bg-[#111] border-white/10 text-white"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Product
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/50">
              Are you sure you want to delete{" "}
              <strong className="text-white">{deleteTarget?.name}</strong>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="admin.cancel_button"
              className="bg-transparent border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.confirm_button"
              onClick={() =>
                deleteTarget && deleteMutation.mutate(deleteTarget.id)
              }
              disabled={deleteMutation.isPending}
              className="bg-red-500 hover:bg-red-600 text-white border-0"
            >
              {deleteMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function AdminPage() {
  const { login, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();

  const { data: isAdmin, isLoading: checkingAdmin } = useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && !!identity,
  });

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-white/50" />
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6">
        <div className="text-center">
          <Lock className="h-10 w-10 text-white/30 mx-auto mb-4" />
          <h1 className="font-display tracking-rocher text-2xl font-semibold text-white mb-2">
            ROCHER ADMIN
          </h1>
          <p className="text-white/40 text-sm">
            Sign in to access the admin panel
          </p>
        </div>
        <Button
          data-ocid="admin.primary_button"
          onClick={login}
          disabled={loginStatus === "logging-in"}
          className="bg-white text-black hover:bg-white/90 px-8"
        >
          {loginStatus === "logging-in" && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In
        </Button>
      </div>
    );
  }

  if (checkingAdmin || isFetching) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-white/50" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <ShieldAlert className="h-12 w-12 text-red-400" />
        <h2 className="text-white text-xl font-semibold">Access Denied</h2>
        <p className="text-white/50 text-sm">
          You don't have admin privileges.
        </p>
      </div>
    );
  }

  return <AdminPanel />;
}
