package com.modus.projectmanagement.Utils;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
@Component
public class CsvUtils {
    private static final CsvMapper mapper = new CsvMapper();
    static {
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }
    public static <T> List<T> read(Class<T> clazz, InputStream stream) throws IOException {
        CsvSchema schema = mapper.schemaFor(clazz).withHeader().withColumnReordering(true);
        ObjectReader reader = mapper.readerFor(clazz).with(schema);
        return reader.<T>readValues(stream).readAll();
    }
}
