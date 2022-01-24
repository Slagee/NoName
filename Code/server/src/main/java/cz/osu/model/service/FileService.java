package cz.osu.model.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class FileService {
    private static final String UPLOADED_FOLDER = "./pdf/";

    public String saveUploadedFile(MultipartFile file) {
        if (!file.isEmpty()) {
            byte[] bytes = new byte[0];
            try {
                bytes = file.getBytes();
                String saveDirectory = UPLOADED_FOLDER + LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd")) + "/";
                File fileDir = new File(saveDirectory);
                fileDir.mkdirs();
                String hashFileName = generateHash(file.getOriginalFilename());
                if (hashFileName.isBlank())
                    return null;
                Path path = Paths.get(saveDirectory + hashFileName);
                Files.write(path, bytes);
                return path.toString();
            } catch (IOException e) {
            e.printStackTrace();
            }
        }
        return null;
    }

    private String generateHash(String originalFilename) {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt);
            return md.digest(originalFilename.getBytes(StandardCharsets.UTF_8)).toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
}
