package com.globalco.propertyrental.service;

import com.globalco.propertyrental.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("jpg", "jpeg", "png", "webp");
    private final Path uploadRoot;

    public FileStorageService(@Value("${app.upload-dir}") String uploadDir) {
        this.uploadRoot = Path.of(uploadDir).toAbsolutePath().normalize();
    }

    public String store(MultipartFile file, String folder) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Upload file is required");
        }
        String originalName = file.getOriginalFilename() == null ? "" : file.getOriginalFilename();
        String extension = extension(originalName);
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new BadRequestException("Only JPG, PNG, and WEBP images are allowed");
        }
        try {
            Path targetDir = uploadRoot.resolve(folder).normalize();
            Files.createDirectories(targetDir);
            String filename = UUID.randomUUID() + "." + extension;
            Path target = targetDir.resolve(filename).normalize();
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + folder + "/" + filename;
        } catch (IOException ex) {
            throw new BadRequestException("Could not store uploaded file");
        }
    }

    private String extension(String filename) {
        int index = filename.lastIndexOf('.');
        if (index < 0 || index == filename.length() - 1) {
            throw new BadRequestException("Uploaded image must include a file extension");
        }
        return filename.substring(index + 1).toLowerCase();
    }
}
