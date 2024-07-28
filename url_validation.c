// url_validation.c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int starts_with(const char *str, const char *prefix) {
    return strncmp(str, prefix, strlen(prefix)) == 0;
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <url>\n", argv[0]);
        return 1;
    }

    const char *url = argv[1];
    if (starts_with(url, "http://") || starts_with(url, "https://")) {
        printf("Valid URL\n");
        return 0;
    } else {
        printf("Invalid URL\n");
        return 1;
    }
}
