import { useMemo, useState } from 'react';
import { MoveDown, MoveUp, Plus, Trash2, Upload, X } from 'lucide-react';
import type { Photo } from '../data/photos';
import { generatePhotoId, insertPhoto, movePhoto, removePhoto } from '../data/photoManager';
import type { PhotoSectionKey } from '../data/photoManager';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioPhotos: Photo[];
  personalPhotos: Photo[];
  onUpdatePortfolio: (photos: Photo[]) => void;
  onUpdatePersonal: (photos: Photo[]) => void;
}

const ACCESS_PASSWORD = import.meta.env.VITE_PHOTO_PASSWORD || 'photos123';

type PhotoDraft = Pick<Photo, 'src' | 'alt' | 'caption'>;

const defaultDraft: PhotoDraft = {
  src: '',
  alt: '',
  caption: ''
};

const PhotoManagerModal = ({
  isOpen,
  onClose,
  portfolioPhotos,
  personalPhotos,
  onUpdatePortfolio,
  onUpdatePersonal
}: PhotoManagerModalProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedSection, setSelectedSection] = useState<PhotoSectionKey>('portfolio');
  const [draft, setDraft] = useState<PhotoDraft>(defaultDraft);
  const [dragActive, setDragActive] = useState(false);
  const [position, setPosition] = useState<number | ''>('');

  const activePhotos = useMemo(
    () => (selectedSection === 'portfolio' ? portfolioPhotos : personalPhotos),
    [personalPhotos, portfolioPhotos, selectedSection]
  );

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === ACCESS_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    setIsAuthenticated(false);
    setDraft(defaultDraft);
    setPosition('');
    onClose();
  };

  const updateSectionPhotos = (updated: Photo[]) => {
    if (selectedSection === 'portfolio') {
      onUpdatePortfolio(updated);
    } else {
      onUpdatePersonal(updated);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const [file] = Array.from(files);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setDraft((prev) => ({
          ...prev,
          src: result,
          alt: prev.alt || file.name
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleAddPhoto = () => {
    if (!draft.src) {
      setError('Please add an image by dragging a file into the drop area.');
      return;
    }

    const newPhoto: Photo = {
      id: generatePhotoId(selectedSection),
      src: draft.src,
      alt: draft.alt || 'Uploaded photo',
      caption: draft.caption?.trim() || undefined
    };

    const insertionPoint = position === '' ? undefined : Math.max(0, Math.min(Number(position), activePhotos.length));
    const updated = insertPhoto(activePhotos, newPhoto, insertionPoint);
    updateSectionPhotos(updated);
    setDraft(defaultDraft);
    setPosition('');
    setError('');
  };

  const handleMove = (id: string, direction: 'up' | 'down') => {
    const updated = movePhoto(activePhotos, id, direction);
    updateSectionPhotos(updated);
  };

  const handleRemove = (id: string) => {
    const updated = removePhoto(activePhotos, id);
    updateSectionPhotos(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-10 px-4">
      <div className="bg-gray-900 w-full max-w-5xl rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h3 className="text-xl font-semibold">Manage Photography</h3>
            <p className="text-sm text-gray-400">Add, caption, and rearrange portfolio or personal photos.</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
            aria-label="Close photo manager"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enter password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg bg-gray-800 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-pink-400">{error}</p>}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 transition rounded-lg"
              >
                Unlock
              </button>
              <p className="text-xs text-gray-400">Password protected access for editing photos.</p>
            </div>
          </form>
        ) : (
          <div className="divide-y divide-white/10">
            <div className="p-6 flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/2 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Destination section</p>
                    <h4 className="text-lg font-semibold">Choose where the photo belongs</h4>
                  </div>
                  <select
                    value={selectedSection}
                    onChange={(event) => setSelectedSection(event.target.value as PhotoSectionKey)}
                    className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2"
                  >
                    <option value="portfolio">Portfolio</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>

                <div
                  className={`border-2 border-dashed rounded-xl p-6 transition ${
                    dragActive ? 'border-pink-500 bg-pink-500/5' : 'border-white/10 bg-gray-900'
                  }`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center gap-3 text-center text-gray-300">
                    <Upload className="w-10 h-10 text-pink-400" />
                    <p className="text-lg font-semibold">Drag & drop to upload</p>
                    <p className="text-sm text-gray-400">Drop an image to attach it to the gallery.</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleFiles(event.target.files)}
                      className="hidden"
                      id="photo-upload-input"
                    />
                    <label
                      htmlFor="photo-upload-input"
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10"
                    >
                      or browse files
                    </label>
                  </div>

                  {draft.src && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                      <img src={draft.src} alt={draft.alt || 'Preview'} className="w-full h-48 object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Alt text</label>
                    <input
                      type="text"
                      value={draft.alt}
                      onChange={(event) => setDraft((prev) => ({ ...prev, alt: event.target.value }))}
                      className="w-full rounded-lg bg-gray-800 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Describe the photo for accessibility"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Caption</label>
                    <input
                      type="text"
                      value={draft.caption}
                      onChange={(event) => setDraft((prev) => ({ ...prev, caption: event.target.value }))}
                      className="w-full rounded-lg bg-gray-800 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Add a caption that appears on hover"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Placement</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={activePhotos.length}
                        value={position}
                        onChange={(event) => {
                          const value = event.target.value;
                          setPosition(value === '' ? '' : Number(value));
                        }}
                        className="w-28 rounded-lg bg-gray-800 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder={`0-${activePhotos.length}`}
                      />
                      <p className="text-xs text-gray-400">Set an index to insert at (leave empty to append).</p>
                    </div>
                  </div>
                  {error && <p className="text-sm text-pink-400">{error}</p>}
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 transition rounded-lg text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" /> Add photo to {selectedSection}
                  </button>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-400">Current photos</p>
                    <h4 className="text-lg font-semibold capitalize">{selectedSection} gallery</h4>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">{activePhotos.length} items</span>
                </div>
                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
                  {activePhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/60 border border-white/5"
                    >
                      <img src={photo.src} alt={photo.alt} className="w-16 h-16 object-cover rounded-md border border-white/10" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{photo.alt}</p>
                        <p className="text-xs text-gray-400 truncate">{photo.caption || 'No caption'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 rounded-md bg-white/5 hover:bg-white/10 disabled:opacity-40"
                          onClick={() => handleMove(photo.id, 'up')}
                          disabled={index === 0}
                          aria-label="Move up"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded-md bg-white/5 hover:bg-white/10 disabled:opacity-40"
                          onClick={() => handleMove(photo.id, 'down')}
                          disabled={index === activePhotos.length - 1}
                          aria-label="Move down"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded-md bg-pink-600/20 text-pink-200 hover:bg-pink-600/30"
                          onClick={() => handleRemove(photo.id)}
                          aria-label="Remove photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {activePhotos.length === 0 && (
                    <div className="p-4 rounded-lg border border-dashed border-white/10 text-sm text-gray-400 text-center">
                      No photos yet in this section.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoManagerModal;
